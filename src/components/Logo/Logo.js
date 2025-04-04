import React from 'react';
import logo from '../../assets/movie_app_logo_circle.png';

const Logo = (props) => {
  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={props.style}
      />
    </div>
  );
};

export default Logo;
