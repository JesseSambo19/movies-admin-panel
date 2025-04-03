import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const ProtectedRoute = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  console.log(
    `ProtectedRoute - Checking Auth: ${authCtx.isCheckingAuth}, isLoggedIn: ${authCtx.isLoggedIn}, isVerified: ${authCtx.isVerified}`
  );

  // when the website is loaded or reloaded, this code checkes for authentication
  // if (authCtx.isCheckingAuth) {
  //   return <div>Loading...</div>; // ✅ Show a loading screen while checking auth
  // }

  // if a user is not logged in while they are trying to access a page other than login and they weren't already logged in
  // then the current path they are trying to access will be stored in memory for redirection when they successfull log in
  if (
    !authCtx.isLoggedIn &&
    location.pathname !== '/login' &&
    location.pathname !== '/' &&
    location.pathname !== '/send-verification-email' &&
    location.pathname !== '/profile' &&
    // !authCtx.isNotVerified &&
    !authCtx.isLoggedOut // this prevents this if statement from triggering when a user is logged out from their current session. When starting a new session
    // this will trigger provided that the conditions above are are all true. In other words, I had an issue where as every time I pressed the log out button to logout, it will still
    // saved the current path and when I tried logging in again, it would take me to that path again. So this fixes that so it doesn't save the current path when I explicitly press the logout button to logout
    // Therefore, the user will be able to land on the home page upon starting a session after logging in again
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
