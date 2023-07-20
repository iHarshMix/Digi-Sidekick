import UserForm from '../components/UserForm'

import classes from './NewUser.module.css'


const NewUserPage = () => {
    return (
        <>
            <UserForm method="post" />

            <div className={classes.social}>
                <div>
                    <a href='http://localhost:8080/auth/google'>
                        <button  className={classes.google}>
                            Sign Up with Google
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}
export default NewUserPage;
