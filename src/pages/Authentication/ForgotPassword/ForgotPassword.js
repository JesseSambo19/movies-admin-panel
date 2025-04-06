import React, { useState, useEffect } from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './ForgotPassword.module.css';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../store/auth-context';
import Input from '../../../components/UI/Input/Input';
import { Link, Navigate } from 'react-router-dom';
import Center from '../../../components/UI/Center/Center';
import useInputReducers from '../../../utils/input-reducers';
import Logo from '../../../components/Logo/Logo';

const ForgotPassword = () => {
  const {
    isLoading,
    setIsLoading,
    formIsValid,
    setFormIsValid,
    emailState,
    emailChangeHandler,
    validateEmailHandler,
    emailInputRef,
    emailIsValid,
  } = useInputReducers();
  const [sendLink, setSendLink] = useState(false); // keeps track of whether user already sent an otp request
  const authCtx = useAuth();

  // useEffect helps us make sure that the code runs once the first time and then again only whenever one of the dependencies change
  // should help you execute code to response to something
  useEffect(() => {
    // debouncing is used to to ensure that this function is executed after 500 milliseconds to check for changes
    // this is helping for performance and unnecessary calls, especially for network traffic when
    // dealing with http requests
    // this now only executes once with every key stroke
    const identifier = setTimeout(() => {
      console.log('Checking for validity!');
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        // we're only checking for changes only with validations
        emailIsValid
      );
    }, 500);
    // clean up function to remove the timer when the component is unmounted
    // it will only run after the useEffect is triggered for the first time (e.g. from the second run)
    // it runs before every new side effect execution
    return () => {
      console.log('CLEAN UP FUNCTION');
      // this will clear the timer set before this cleanup is triggered e.g the last side effect execution
      // so that when a new side effect execution is due, we can set a new timer
      clearTimeout(identifier);
    };
    // }, [enteredEmail, enteredPassword]);
    // we're only checking for changes only with validations
  }, [emailIsValid, setFormIsValid]);
  // }, [emailState.isValid, passwordState.isValid]); // alternatively one can access the properties that need to be dependencies instead of the whole state object

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

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    if (formIsValid) {
      authCtx.onForgotPassword(emailState.value, setIsLoading, setSendLink);
      // Reset the email state
      // dispatchEmail({ type: 'RESET' });
    } else if (!emailIsValid) {
      // this targets the function that was set in the Input component's ref variable
      emailInputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Center>
        <div style={{ width: '100%' }}>
          <center>
            <Logo />
          </center>
          <Card className={classes['forgot-password']}>
            {sendLink ? (
              <p className={classes['reset-password-message']}>
                We have sent you a password reset link to your email. Please
                check your inbox to continue. If you don't see it, be sure to
                check your spam or junk folder.
              </p>
            ) : (
              <p className={classes['reset-password-message']}>
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
              </p>
            )}

            <form onSubmit={submitHandler}>
              <Input
                ref={emailInputRef}
                id="email"
                label="E-Mail"
                type="email"
                isValid={emailIsValid}
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
              <div className={classes.actions}>
                <Button
                  type="submit"
                  // className={classes.btn}
                  disabled={!formIsValid || isLoading}
                >
                  {isLoading
                    ? 'Sending...'
                    : sendLink
                    ? 'Send New Reset Link'
                    : ' Send Reset Link'}
                </Button>
              </div>
              <span className={classes.link}>
                <Link to="/login">Remembered Password?</Link>
              </span>
            </form>
          </Card>
        </div>
      </Center>
    </React.Fragment>
  );
};

export default ForgotPassword;
