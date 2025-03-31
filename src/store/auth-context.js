import React, { useState, useEffect, useRef } from 'react';
import {
  handleForgotPassword,
  handleLogin,
  handleLogout,
  handleRegister,
  handleResetPassword,
  handleVerifyEmail,
  resendVerificationEmail,
  // handleVerifyToken,
} from '../services/auth-api';

const AuthContext = React.createContext({
  userName: '',
  isLoggedIn: false,
  isLoggedOut: false,
  isVerified: false,
  isCheckingAuth: true, // ✅ New state to indicate checking auth
  pathName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
  onRegister: (name, email, password, confirmPassword) => {},
  onForgotPassword: (email) => {},
  onResetPassword: (email, password, confirmPassword) => {},
  onVerifyEmail: (email, password) => {},
  onResendVerificationEmail: (userId, navigate) => {},
  onAddPathName: (pathName) => {},
  onRemovePathName: () => {},
});

export const AuthContextProvider = (props) => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const pathNameRef = useRef(''); // Using useRef to store pathName without triggering re-renders

  // to ensure that the component doesn't re render for every state change
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token'); // Store the token in localStorage
    const userName = localStorage.getItem('userName'); // Retrieve the user's name from localStorage
    const isVerified = localStorage.getItem('isVerified'); // Retrieve the user's name from localStorage

    if (storedUserLoggedInInformation === '1' && isVerified === '1' && token) {
      setIsLoggedIn(true);
      setIsVerified(true);
      setUserName(userName);

      // Optional: You could check token expiry here if you have expiry time available
      // handleVerifyToken(token, setIsLoggedIn)
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

  const loginHandler = (email, password, navigate) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    handleLogin(
      setUserName,
      email,
      password,
      getPathNameHandler,
      setIsLoggedIn,
      setIsLoggedOut,
      setIsVerified,
      navigate
    );
  };

  const logoutHandler = () => {
    handleLogout(setIsLoggedIn, setIsLoggedOut, setUserName, setIsVerified);
  };

  const registerHandler = (
    name,
    email,
    password,
    confirmPassword,
    navigate
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    if (password !== confirmPassword) {
      alert(`The password field confirmation does not match.`);
      return;
    }

    alert('Successfully registered.');
    // navigate('/verify-email');

    handleRegister(
      name,
      email,
      password,
      confirmPassword,
      navigate
      // getPathNameHandler,
      // setIsLoggedIn,
      // setIsLoggedOut
    );
  };

  const forgotPasswordHandler = (
    email
    // getPathNameHandler,
    // setIsLoggedIn,
    // setIsLoggedOut
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    alert('We have emailed your password reset link.');

    handleForgotPassword(
      email
      // getPathNameHandler,
      // setIsLoggedIn,
      // setIsLoggedOut
    );
  };

  const resetPasswordHandler = (
    email,
    token,
    password,
    confirmPassword,
    navigate
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    if (password !== confirmPassword) {
      alert(`The password field confirmation does not match.`);
      return;
    }

    // alert('Your password has been reset.');
    handleResetPassword(
      email,
      token,
      password,
      confirmPassword,
      navigate
      // getPathNameHandler,
      // setIsLoggedIn,
      // setIsLoggedOut
    );
  };

  // This should be called when the user clicks the verification link.
  const verifyEmailHandler = (userId, navigate) => {
    handleVerifyEmail(userId, navigate);
  };

  const resendVerificationEmailHandler = (email) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // alert(
    //   'A new verification link has been sent to the email address you provided during registration.'
    // );
    resendVerificationEmail(email);

    // handleVerifyEmail(
    // );
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        isLoggedIn,
        isLoggedOut,
        isVerified,
        isCheckingAuth, // ✅ Provide this state to context
        // pathName: pathName,
        pathName: pathNameRef.current, // Provide pathName from useRef
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onForgotPassword: forgotPasswordHandler,
        onResetPassword: resetPasswordHandler,
        onVerifyEmail: verifyEmailHandler,
        onResendVerificationEmail: resendVerificationEmailHandler,
        onAddPathName: addPathNameHandler,
        onRemovePathName: removePathNameHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
