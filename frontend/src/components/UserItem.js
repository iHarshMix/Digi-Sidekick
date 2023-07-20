import { Link, useSubmit } from 'react-router-dom';
import classes from './UserItem.module.css';

function UserItem({ user }) {
  const submit= useSubmit();
  function startDeleteHandler() {
    const proceed=window.confirm('Are you sure?')
    if(proceed){
      submit(null, {method:'DELETE'})
    }
  }

  return (
    <article className={classes.user}>
      <h1>{user.username}</h1>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default UserItem;
