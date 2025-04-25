import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import GlobalLoadingSpinner from '../../components/GlobalLoadingSpinner/GlobalLoadingSpinner';
import classes from './Layout.module.css';

export const Layout1 = () => {
  // this layout component determines how the pages of the website will be rendered
  return (
    <React.Fragment>
      <GlobalLoadingSpinner /> {/* Spinner visible when loading */}
      <Header />
      <div className={classes.space}>
        <Outlet /> {/* Renders the child route */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export const Layout2 = () => {
  // this layout component determines how the pages of the website will be rendered
  return (
    <React.Fragment>
      <Outlet /> {/* Renders the child route */}
    </React.Fragment>
  );
};

// export default Layout;
