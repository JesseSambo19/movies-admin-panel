import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './VerifyEmail.module.css';
import Button from '../../../components/UI/Button/Button';
import AuthContext from '../../../store/auth-context';
import {
  Link,
  Navigate,
  // useNavigate
} from 'react-router-dom';
import Center from '../../../components/UI/Center/Center';

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);
  //   const navigate = useNavigate();

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
      <Card className={classes['verify-email']}>
        <p>
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </p>
        <span className={classes.space}>
          <div className={classes.actions}>
            <Button
              type="submit"
              // className={classes.btn}
              // disabled={!formIsValid}
              onClick={authCtx.onVerifyEmail}
            >
              Resend Verification Email
            </Button>
          </div>
          <Link onClick={authCtx.onLogout}>Log Out</Link>
        </span>
      </Card>
    </Center>
  );
};

export default VerifyEmail;
