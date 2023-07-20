import { Form, useNavigate, useNavigation , useActionData, redirect, json} from 'react-router-dom';

import classes from './UserForm.module.css';

function UserForm({ method, user }) {

  const data= useActionData();  // it gives access to the closest action(), 

  const navigate = useNavigate();
  const navigation= useNavigation();
  function cancelHandler() {
    navigate('..');
  }

  const isSubmitting= navigation.state=== 'submitting';

  return (
    <Form method={method} className={classes.form}>

      {data && data.errors && <ul>
        {Object.values(data.errors).map(err=> <li key={err}>{err}</li>)}
      </ul>}

      <p>
        <label htmlFor="username">username</label>
        <input 
          id="username" 
          type="text" 
          name="username" 
          required 
          defaultValue={user ? user.username : ''}
        />
      </p>
{ method!=='patch' &&      <p>
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          required 
          defaultValue={user ? user.password : ''}
        />
      </p>}
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting': 'Register'}</button>
      </div>
    </Form>
  );
}

export default UserForm;

export async function action({ request, params }) {
  const method= request.method;
  const data = await request.formData();


  var userData = {
      username: data.get('username'),
      password: data.get('password')
  };

  let url='http://localhost:8080/users'
  if(method==='PATCH'){
    const userId= params.userId;
    url='http://localhost:8080/users/'+userId;
    userData={
      username: data.get('username')
    }
  }

  const response = await fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  });

  if(response.status===422){
      return response;
  }

  if (!response.ok) {
      throw json({ message: 'Could not save user.' }, { status: 500 });
  }

  return redirect('/users');
}
