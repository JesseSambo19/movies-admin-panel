import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import classes from './Layout.module.css';

const Layout = () => {
  // this layout component determines how the pages of the website will be rendered
  return (
    <React.Fragment>
      <Header />
      <div className={classes.space}>
        <Outlet /> {/* Renders the child route */}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
