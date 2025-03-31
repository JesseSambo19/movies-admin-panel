import React, { useEffect, useContext } from 'react';

// import classes from './VerifyEmail.module.css';
import AuthContext from '../../../store/auth-context';
import {
  Navigate,
  useParams,
  // useNavigate
} from 'react-router-dom';
import Center from '../../../components/UI/Center/Center'

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);
  //   const navigate = useNavigate();

  const { id } = useParams(); // Get the userId from URL
  useEffect(() => {
    if (id) {
      authCtx.onVerifyEmail(id); // Call the function to verify email
    }
  }, [authCtx, id]);

  // if a user is already logged in and they are trying to access the login page
  // they will be redirected to home page
  console.log(`Login pathname: ${authCtx.pathName}`);
  if (authCtx.isLoggedIn && authCtx.pathName === '') {
    return (
      <Navigate
        to="/home"
        replace
      />
    ); // ✅ Redirect logged-in users
    // this is for scenarios where you weren't logged in before but you tried accessing a page e.g path = /add-movies
    // that path will be stored for when you log in, it will redirect you to that page
  }
  // else if (authCtx.isLoggedIn && authCtx.pathName !== '') {
  //   console.log(
  //     `Redirecting user to: ${authCtx.pathName} after successful login`
  //   );
  //   navigate(authCtx.pathName); // ✅ Redirect logged-in users
  //   authCtx.onRemovePathName(); // the path name that was stored in localStorage will be removed upon successful login
  //   // return (
  //   //   <Navigate
  //   //     to={authCtx.pathName}
  //   //     replace
  //   //   />
  //   // ); // ✅ Redirect logged-in users
  // }

  return (
    <Center>
      <h2>Verifying your email...</h2>
    </Center>
  );
};

export default VerifyEmail;
