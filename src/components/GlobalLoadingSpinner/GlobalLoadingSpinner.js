import React from 'react';
import ReactDOM from 'react-dom';
import { useLoading } from '../../store/loading-context';
import classes from './GlobalLoadingSpinner.module.css';

const LoadingOverlay = (props) => {
  return (
    <div className={classes['loading-overlay']}>
      <div className={classes.spinner}></div>
    </div>
  );
};

// gets the id declared in index.html so that it can be placed at that position
const portalElement = document.getElementById('loading-overlay');

function GlobalLoadingSpinner() {
  const { loading } = useLoading();

  if (!loading) return null; // Don't show if not loading

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<LoadingOverlay />, portalElement)}
    </React.Fragment>
  );
}

export default GlobalLoadingSpinner;
