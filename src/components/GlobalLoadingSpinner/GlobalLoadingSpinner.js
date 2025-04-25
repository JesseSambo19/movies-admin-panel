import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLoading } from '../../store/loading-context';
import classes from './GlobalLoadingSpinner.module.css';
import { useLocation } from 'react-router-dom';

const LoadingOverlay = () => {
  return (
    <div className={classes['loading-overlay']}>
      <div className={classes.spinner}></div>
    </div>
  );
};

// gets the id declared in index.html so that it can be placed at that position
const portalElement = document.getElementById('loading-overlay');

function GlobalLoadingSpinner() {
  const { loading, setLoading } = useLoading();

  const location = useLocation();

  // this is specifically for pages that don't trigger get requests
  // they will have a loading spinner for 3 seconds
  // for pages that do trigger get requests, the loading spinner will be shown until the data is fetched
  // their respective get request functions
  useEffect(() => {
    if (
      location.pathname === '/fetch-movies' ||
      location.pathname.includes('/view-movie') ||
      location.pathname.includes('/edit-movie') ||
      location.pathname === '/profile'
    ) {
      return;
    }
    console.log('Loading...');
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000); // 3 secs

    return () => clearTimeout(timeout);
  }, [setLoading, location.pathname]);

  if (!loading) return null; // Don't show if not loading

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<LoadingOverlay />, portalElement)}
    </React.Fragment>
  );
}

export default GlobalLoadingSpinner;
