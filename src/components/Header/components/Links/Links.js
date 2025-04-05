import React from 'react';
import classes from './Links.module.css';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';

const Links = (props) => {
  const onClick = props.mobile ? props.onCloseModal : () => () => {};
  const closeDropdownAndModal = () => {
    props.onCloseDropdown();
    props.onCloseModal();
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
          {props.userName}
          <span style={{ paddingTop: '100px', paddingLeft: '10px' }}>
            <AiOutlineCaretDown size={16} />
          </span>
        </p>
        {props.showDropdown && (
          <ul className={classes[props.className3]}>
            {props.mobile ? (
              <Link
                to="/profile"
                onClick={
                  props.mobile ? closeDropdownAndModal : props.onCloseDropdown
                }
              >
                Profile
              </Link>
            ) : (
              <li style={{ paddingTop: '20px' }}>Profile</li>
            )}
            <li onClick={props.onHandleLogout}>
              <p>Logout</p>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Links;
