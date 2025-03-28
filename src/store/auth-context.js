import React, { useState, useEffect, useRef } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoggedOut: false,
  isCheckingAuth: true, // ✅ New state to indicate checking auth
  pathName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
  onAddPathName: (pathName) => {},
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
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
    setIsLoggedOut(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsLoggedOut(true);

    removePathNameHandler();
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
