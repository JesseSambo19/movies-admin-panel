import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const ProtectedRoute = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  console.log(
    `ProtectedRoute - Checking Auth: ${authCtx.isCheckingAuth}, isLoggedIn: ${authCtx.isLoggedIn}`
  );

  // when the website is loaded or reloaded, this code checkes for authentication
  if (authCtx.isCheckingAuth) {
    return <div>Loading...</div>; // ✅ Show a loading screen while checking auth
  }

  // if a user is not logged in while they are trying to access a page other than login and they weren't already logged in
  // then the current path they are trying to access will be stored in memory for redirection when they successfull log in
  if (
    !authCtx.isLoggedIn &&
    location.pathname !== '/login' &&
    !authCtx.isLoggedOut
  ) {
    authCtx.onAddPathName(location.pathname);
    console.log(
      `user is not logged in, redirecting to login and storing current location for future use: ${location.pathname}`
    );
  }

  if (authCtx.isLoggedIn && location.pathname === '/') {
    return (
      <Navigate
        to="/home"
        replace
      />
    ); // ✅ Redirect logged-in users
  }

  // this protects the routes accessible when logged in
  // when logged in one can access all the pages, if not they will only on the login page
  return authCtx.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;
