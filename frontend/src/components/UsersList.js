import {Link} from 'react-router-dom'

import classes from './UsersList.module.css';

function UsersList({ users }) {
  console.log(users);
  return (
    <div className={classes.users}>
      <h1>All Users</h1>
      <ul className={classes.list}>
        {users.map((user) => (
          <Link to={user._id}>
            <li key={user._id} className={classes.item}>
              <div className={classes.content}>
                {user.username && <h2>{user.username}</h2>}
                {/* {user.googleName && <h2>{user.googleName}</h2>} */}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div >
  );
}

export default UsersList;