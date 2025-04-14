import React from 'react';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return (
    <div
      className={classes.spinner}
      style={props.style}
    ></div>
  );
};

export default LoadingSpinner;
