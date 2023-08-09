require('dotenv').config();  // should be written at the top.
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://iharshmix:<password>.qrqrard.mongodb.net/users");


const userSchema = new mongoose.Schema({
    // email: String,
    username: String,
    password: String,
    googleId: String,
    // googleName: String
    // secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/users",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},

    function (accessToken, refreshToken, profile, cb) {

        console.log(profile);
        User.findOrCreate({ googleId: profile.id, username: profile.displayName }, function (err, user) {
            return cb(err, user);
        });
    }
));




app.get("/auth/google", (req, res) => {
    return passport.authenticate("google", { scope: ["profile"] })(req, res);
});


app.get("/auth/google/users",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000/users/new" }),
    function (req, res) {
        // Successful authentication, redirect users page.
        res.redirect("http://localhost:3000/users");
    }
);

app.get('/users', function (req, res) {

    User.find().then(function (foundUsers) {
        res.send(foundUsers);
    });
})



// used for best practices when using oauth or session tokens ,

// app.post('/users', function (req, res) {  
    //     User.register({ username: req.body.username }, req.body.password, function (err, user) {
        //         if (err) {
            //             console.log(err);
//             res.redirect("http://localhost:3000/users");
//         } else {
//             passport.authenticate("local")(req, res, function () {
    //                 res.redirect("https://localhost:3000/users");
    //             })
    //         }
    //     })
    // })
    
    
    // app.post('/login', function (req, res) {
        //     const user = new User({
            //         username: req.body.username,
            //         passport: req.body.password
            //     })
            //     //.login() method comes from passport
            //     req.login(user, function (err) {
                //         if (err) {
                    //             console.log(err);
                    //         } else {
                        //             passport.authenticate("local")(req, res, function () {
                            //                 res.redirect("/secrets");
//             })
//         }
//     })
// })
// app.get("/logout", function (req, res) {
//     req.logout(function (err) {
//         if (err) {
//             console.log(err);
//             res.redirect("/");
//         } else {
//             res.redirect("/");
//         }
//     });
// });


app.post('/users', function (req, res) {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })

    newUser.save().then(function (result) {
        console.log("result is:", result);
        res.send("Successfully added a new user")
    }).catch(function (err) {
        console.log("Error is:", err);
        res.send(err);
    });
});


app.get('/users/:id', function (req,res){
    User.findOne({_id: req.params.id}).then((foundUser)=>{
        if(foundUser){
            console.log('Found User Successfully');
            res.send(foundUser);
        } else{
            res.send("No User found!")
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.patch('/users/:id', function (req, res){
    User.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    ).then((updatedUser)=>{
        console.log(updatedUser);
        res.send("Successfully Updated User (PATCH)");
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
})

app.delete('/users/:id',function(req,res){
    User.deleteOne(
        {_id: req.params.id}

        ).then((result)=>{
        console.log(result);
        res.send("A Specific user is successfully deleted");

    }).catch((err)=>{
        res.send(err);
    });
})


app.listen(8080, function () {
    console.log("server listening on port 8080");
})
