import React, { useState } from 'react';
import classes from './Links.module.css';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

const Links = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = props.mobile ? props.onCloseModal : () => () => {};
  const closeDropdownAndModal = () => {
    props.onCloseDropdown();
    props.onCloseModal();
  };

  const handleLogout = () => {
    props.onHandleLogout(setIsLoading);
  };
  return (
    <ul className={classes[props.className1]}>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? classes.active : '')}
          onClick={onClick}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fetch-movies"
          className={({ isActive }) => (isActive ? classes.active : '')}
          onClick={onClick}
        >
          Fetch Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-movie"
          className={({ isActive }) => (isActive ? classes.active : '')}
          onClick={onClick}
        >
          Add Movie
        </NavLink>
      </li>
      <li
        ref={props.dropdownRef}
        className={classes['position-relative']}
      >
        <p
          className={classes[props.className2]}
          onClick={props.onOpenDropdown}
        >
          {props.mobile ? props.userName.split(' ')[0] : props.userName}
          <span style={{ paddingTop: '100px', paddingLeft: '10px' }}>
            <AiOutlineCaretDown size={16} />
          </span>
        </p>
        {props.showDropdown && (
          <ul className={classes[props.className3]}>
            {props.mobile ? (
              <Link
                to="/profile"
                onClick={closeDropdownAndModal}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/profile"
                onClick={props.onCloseDropdown}
              >
                <li style={{ paddingTop: '20px' }}>Profile</li>
              </Link>
            )}
            {isLoading ? (
              <li>
                {/* <p>...........</p> */}
                <center>
                  <LoadingSpinner
                    style={{
                      width: '30px',
                      height: '30px',
                      marginRight: '0px',
                      marginTop: '10px',
                      borderTop: '2px solid yellow'
                    }}
                  />
                </center>
                {/* <p>Logging out...</p> */}
              </li>
            ) : (
              <li onClick={handleLogout}>
                <p>Logout</p>
              </li>
            )}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Links;
