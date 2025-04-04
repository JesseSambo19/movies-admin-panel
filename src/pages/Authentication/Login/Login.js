import React, { useEffect } from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './Login.module.css';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../store/auth-context';
import Input from '../../../components/UI/Input/Input';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Center from '../../../components/UI/Center/Center';
import useInputReducers from '../../../utils/input-reducers';

const Login = () => {
  const {
    isLoading,
    setIsLoading,
    formIsValid,
    setFormIsValid,
    emailState,
    passwordState,
    emailChangeHandler,
    passwordChangeHandler,
    validateEmailHandler,
    validatePasswordHandler,
    emailInputRef,
    passwordInputRef,
    emailIsValid,
    passwordIsValid,
  } = useInputReducers();

  const authCtx = useAuth();
  // const { isLoading, onLogin } = useAuth();
  const navigate = useNavigate();

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
        emailIsValid && passwordIsValid
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
  }, [emailIsValid, passwordIsValid, setFormIsValid]);
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
  } else if (authCtx.isLoggedIn && authCtx.pathName !== '') {
    console.log(
      `Redirecting user to: ${authCtx.pathName} after successful login`
    );
    navigate(authCtx.pathName); // ✅ Redirect logged-in users
    authCtx.onRemovePathName(); // the path name that was stored in localStorage will be removed upon successful login
  }

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    if (formIsValid) {
      // setIsLoading(true);
      // authCtx.onLogin(
      authCtx.onLogin(
        emailState.value,
        passwordState.value,
        navigate,
        setIsLoading
      );
      // setIsLoading(false);
    } else if (!emailIsValid) {
      // this targets the function that was set in the Input component's ref variable
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Center>
        <Card className={classes.login}>
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
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            {/* <Input
            ref={passwordInputRef}
            id="password"
            label="Remember me"
            type="checkbox"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          /> */}
            <div className={classes.actions}>
              <Button
                type="submit"
                // className={classes.btn}
                disabled={!formIsValid || isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Login'}
              </Button>
            </div>
            <span className={classes.links}>
              <Link to="/register">Don't have an account?</Link>
              <Link to="/forgot-password">Forgot your password?</Link>
            </span>
          </form>
        </Card>
      </Center>
    </React.Fragment>
  );
};

export default Login;
