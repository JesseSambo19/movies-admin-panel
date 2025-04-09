import React, { useEffect } from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './Register.module.css';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../store/auth-context';
import Input from '../../../components/UI/Input/Input';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Center from '../../../components/UI/Center/Center';
import useInputReducers from '../../../utils/input-reducers';
import Logo from '../../../components/Logo/Logo';

const Register = () => {
  const {
    isLoading,
    setIsLoading,
    formIsValid,
    setFormIsValid,
    nameState,
    emailState,
    passwordState,
    confirmPasswordState,
    nameChangeHandler,
    emailChangeHandler,
    passwordChangeHandler,
    confirmPasswordChangeHandler,
    validateNameHandler,
    validateEmailHandler,
    validatePasswordHandler,
    validateConfirmPasswordHandler,
    nameInputRef,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    nameIsValid,
    emailIsValid,
    passwordIsValid,
    confirmPasswordIsValid,
  } = useInputReducers();

  const authCtx = useAuth();

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
        emailIsValid &&
          passwordIsValid &&
          nameIsValid &&
          confirmPasswordIsValid &&
          passwordState.value === confirmPasswordState.value
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
  }, [
    emailIsValid,
    passwordIsValid,
    nameIsValid,
    confirmPasswordIsValid,
    setFormIsValid,
    passwordState.value,
    confirmPasswordState.value,
  ]);
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
    // if (passwordState.value !== confirmPasswordState) {
    //   alert("Password and Confirm Password don't math");
    //   return;
    // }

    if (formIsValid) {
      authCtx.onRegister(
        nameState.value,
        emailState.value,
        passwordState.value,
        confirmPasswordState.value,
        navigate,
        setIsLoading
      );
    } else if (!nameIsValid) {
      // this targets the function that was set in the Input component's ref variable
      nameInputRef.current.focus();
    } else if (!emailIsValid) {
      // this targets the function that was set in the Input component's ref variable
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      // this targets the function that was set in the Input component's ref variable
      passwordInputRef.current.focus();
    } else {
      // this targets the function that was set in the Input component's ref variable
      confirmPasswordInputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Center>
        <div style={{ width: '100%' }}>
          <center>
            <Logo />
          </center>
          <Card className={classes.register}>
            <form onSubmit={submitHandler}>
              <Input
                ref={nameInputRef}
                id="name"
                label="Name"
                type="text"
                isValid={nameIsValid}
                value={nameState.value}
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
              />
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
              <Input
                ref={confirmPasswordInputRef}
                id="confirm_password"
                label="Confirm Password"
                type="password"
                isValid={
                  confirmPasswordIsValid &&
                  passwordState.value === confirmPasswordState.value
                }
                value={confirmPasswordState.value}
                onChange={confirmPasswordChangeHandler}
                onBlur={validateConfirmPasswordHandler}
              />
              {passwordState.value.length > 0 && passwordIsValid === false && (
                <p style={{ color: 'red' }}>
                  Password needs to be at least 8 characters
                </p>
              )}
              {confirmPasswordState.value.length > 0 &&
                passwordState.value !== confirmPasswordState.value && (
                  <p style={{ color: 'red' }}>Passwords do not match</p>
                )}
              <div className={classes.actions}>
                <Button
                  type="submit"
                  // className={classes.btn}
                  disabled={!formIsValid || isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </div>
              <span className={classes.link}>
                <Link to="/login">Already registered?</Link>
              </span>
            </form>
          </Card>
        </div>
      </Center>
    </React.Fragment>
  );
};

export default Register;
