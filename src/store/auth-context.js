import React, { useState, useEffect, useRef, useContext } from 'react';
import useAuthApi from '../services/auth-api';

const AuthContext = React.createContext({
  userName: '',
  isLoggedIn: false,
  isLoggedOut: false,
  isVerified: false,
  isCheckingAuth: true, // ✅ New state to indicate checking auth
  isLoading: false,
  pathName: '',
  onLogout: () => {},
  onLogin: (email, password) => {},
  onRegister: (name, email, password, confirmPassword) => {},
  onForgotPassword: (email) => {},
  onResetPassword: (email, password, confirmPassword) => {},
  onSendOtp: () => {},
  onVerifyOtp: (otpCode) => {},
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
  const {
    handleForgotPassword,
    handleLogin,
    handleLogout,
    handleRegister,
    handleResetPassword,
    handleSendOtp,
    verifyOtp,
    // handleVerifyToken,
  } = useAuthApi();

  // to ensure that the component doesn't re render for every state change
  useEffect(() => {
    const isLoggedInCache = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token'); // Store the token in localStorage
    const userNameCache = localStorage.getItem('userName'); // Retrieve the user's name from localStorage
    const isVerifiedCache = localStorage.getItem('isVerified'); // Retrieve the user's name from localStorage

    // if the user is logged in with a valid token and verified then the user will be authenticated on the dashboard
    if (isLoggedInCache === '1' && isVerifiedCache === '1' && token) {
      setIsLoggedIn(true);
      setIsVerified(true);
      setUserName(userNameCache);

      // Optional: You could check token expiry here if you have expiry time available
      // handleVerifyToken(token, setIsLoggedIn)
    }
    // if the user is loggedin with a valid token but not verified then the user will not be authenticated on the dashboard
    // hence they will be required to verify their email address
    else if (isLoggedInCache === '1' && isVerifiedCache === '0' && token) {
      setIsLoggedIn(true);
      setIsVerified(false);
      setUserName(userNameCache);
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

  const loginHandler = (email, password, navigate, setIsLoading) => {
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
      navigate,
      setIsLoading
    );
  };

  const logoutHandler = (setIsLoading) => {
    handleLogout(
      setIsLoggedIn,
      setIsLoggedOut,
      setUserName,
      setIsVerified,
      setIsLoading
    );
  };

  const registerHandler = (
    name,
    email,
    password,
    confirmPassword,
    navigate,
    setIsLoading
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // if (password !== confirmPassword) {
    //   alert('The passwords do not match.');
    //   return;
    // }

    handleRegister(
      name,
      email,
      password,
      confirmPassword,
      navigate,
      setIsLoading
    );
  };

  const forgotPasswordHandler = (email, setIsLoading, setSendLink) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    handleForgotPassword(email, setIsLoading, setSendLink);
  };

  const resetPasswordHandler = (
    email,
    token,
    password,
    confirmPassword,
    navigate,
    setIsLoading
  ) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // if (password !== confirmPassword) {
    //   alert(`The password field confirmation does not match.`);
    //   return;
    // }

    // alert('Your password has been reset.');
    handleResetPassword(
      email,
      token,
      password,
      confirmPassword,
      navigate,
      setIsLoading
      // getPathNameHandler,
      // setIsLoggedIn,
      // setIsLoggedOut
    );
  };

  const sendOtpHandler = (setSendingOtp, setSendOtp) => {
    handleSendOtp(setSendingOtp, setSendOtp);
  };

  const verifyOtpHandler = (otpCode, setVerifyingOtp) => {
    verifyOtp(
      otpCode,
      // setIsVerified,
      setVerifyingOtp
    );
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
        onVerifyOtp: verifyOtpHandler,
        onSendOtp: sendOtpHandler,
        onAddPathName: addPathNameHandler,
        onRemovePathName: removePathNameHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// export default AuthContext; // old way
export function useAuth() {
  // custom hook
  return useContext(AuthContext);
}
