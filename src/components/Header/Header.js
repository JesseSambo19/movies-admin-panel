import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { useAuth } from '../../store/auth-context';
import { ChevronDown } from 'lucide-react';
import Logo from '../Logo/Logo';

const Header = () => {
  const authCtx = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const openDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    closeDropdown();
    authCtx.onLogout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={classes.navbar}>
      <div>
        <span className={classes.logo}>
          <Link to="/home">
            <Logo />
          </Link>
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
          <li
            ref={dropdownRef}
            className={classes['position-relative']}
          >
            <p
              className={classes.dropdown}
              onClick={openDropdown}
            >
              {authCtx.userName}
              <span style={{ paddingTop: '100px', paddingLeft: '10px' }}>
                <ChevronDown size={16} />
              </span>
            </p>
            {showDropdown && (
              <ul className={classes['dropdown-menu']}>
                <Link
                  to="/profile"
                  onClick={closeDropdown}
                >
                  <li style={{ paddingTop: '15px' }}>Profile</li>
                </Link>
                <li onClick={handleLogout}>
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
