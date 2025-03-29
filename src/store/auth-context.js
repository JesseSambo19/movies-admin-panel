import React, { useState, useEffect, useRef } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoggedOut: false,
  isCheckingAuth: true, // ✅ New state to indicate checking auth
  pathName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
  onAddPathName: (pathName) => {},
  onRemovePathName: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // ✅ New state
  const pathNameRef = useRef(''); // Using useRef to store pathName without triggering re-renders

  // to ensure that the component doesn't re render for every state change
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
    // IsLoggedIn state changes only after the component has been rendered hence it would still be set false and then true
    setIsCheckingAuth(false); // ✅ Mark auth check as complete

    // return () => {};
    //  Clean-up functions are typically used for tasks like canceling subscriptions,
    // clearing timers, or removing event listeners when the component unmounts.
  }, []);

  const getPathNameHandler = () => {
    // setPathName(pathName);
    pathNameRef.current = localStorage.getItem('pathName') ?? '';
    console.log(`retrieved path name ${pathNameRef.current}`);
  };

  const addPathNameHandler = (pathName) => {
    localStorage.setItem('pathName', pathName);
    // setPathName(pathName);
    pathNameRef.current = pathName; // Store pathName in useRef
    console.log(`stored path name ${pathName}`);
  };

  const removePathNameHandler = () => {
    localStorage.removeItem('pathName');
    // setPathName('');
    pathNameRef.current = ''; // Clear the pathName in useRef
    console.log('removed stored path name');
  };

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    getPathNameHandler();
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
    setIsLoggedOut(false); // if the user isn't logged in and they are accessing a page e.g. /add-movie, they will be redirected to /login and
    // the path/page where they were at before redirected to /login is saved in localStorage so when they login,
    // they will be redirected to path that was saved in localStorage
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsLoggedOut(true); // this ensures that when the user logs out, the path/page where they were at before redirected to /login
    //  isn't saved in localStorage so when they login again, they will be redirected to /home
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoggedOut,
        isCheckingAuth, // ✅ Provide this state to context
        // pathName: pathName,
        pathName: pathNameRef.current, // Provide pathName from useRef
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onAddPathName: addPathNameHandler,
        onRemovePathName: removePathNameHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
