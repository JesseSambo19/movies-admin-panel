import React from 'react';
import classes from './Center.module.css';

const Center = (props) => {
  return (
    <div
      className={classes.center}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Center;
