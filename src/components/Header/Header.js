import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.navbar}>
      <div>
        <span className={classes.logo}>
          <h1>Movie App</h1>
        </span>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fetch-movies"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Fetch Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-movie"
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              Add Movie
            </NavLink>
          </li>
          <li>
            <Button
              style={{ padding: '0px', height: '40px', width: '100px' }}
              onClick={authCtx.onLogout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
