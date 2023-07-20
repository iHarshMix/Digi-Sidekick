import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
// import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <NewsletterSignup /> */}
    </header>
  );
}

export default MainNavigation;
