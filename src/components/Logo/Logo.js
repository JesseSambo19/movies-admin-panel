import React from 'react';
import logo from '../../assets/movie_app_logo_circle.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div>
      <img
        className={classes.logo}
        src={logo}
        alt="logo"
        // style={props.style}
      />
    </div>
  );
};

export default Logo;
