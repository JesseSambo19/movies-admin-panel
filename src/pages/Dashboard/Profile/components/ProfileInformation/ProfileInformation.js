import React, { useEffect } from 'react';
import Card from '../../../../../components/UI/Card/Card';
import Input from '../../../../../components/UI/Input/Input';
import Button from '../../../../../components/UI/Button/Button';
import classes from './ProfileInformation.module.css';
import useProfileApi from '../../../../../services/profile-api';
import useInputReducers from '../../../../../utils/input-reducers';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';
import { useAuth } from '../../../../../store/auth-context';

const ProfileInformation = () => {
  const {
    isLoading,
    setIsLoading,
    formIsValid,
    setFormIsValid,
    nameState,
    emailState,
    nameChangeHandler,
    emailChangeHandler,
    dispatchName,
    dispatchEmail,
    validateNameHandler,
    validateEmailHandler,
    nameInputRef,
    emailInputRef,
    nameIsValid,
    emailIsValid,
  } = useInputReducers();
  const authCtx = useAuth();

  const { fetchUserProfile, updateUserProfile } = useProfileApi();

  useEffect(() => {
    fetchUserProfile(dispatchName, dispatchEmail);
  }, [fetchUserProfile, dispatchName, dispatchEmail]);

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
        nameIsValid && emailIsValid
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
  }, [nameIsValid, emailIsValid, setFormIsValid]);
  // }, [emailState.isValid, passwordState.isValid]); // alternatively one can access the properties that need to be dependencies instead of the whole state object

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    if (formIsValid) {
      // authCtx.onLogin(nameState.value, emailState.value, navigate);
      updateUserProfile(nameState.value, emailState.value, setIsLoading);
    } else if (!nameIsValid) {
      // this targets the function that was set in the Input component's ref variable
      nameInputRef.current.focus();
    } else {
      emailInputRef.current.focus();
    }
  };
  return (
    <Card>
      <div>
        <h3>Profile Information</h3>
        <p>Update your account's profile information and email address.</p>
      </div>
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
        <div className={classes.actions}>
          <Button
            type="submit"
            // className={classes.btn}
            disabled={
              !formIsValid ||
              isLoading ||
              (nameState.value === authCtx.userName &&
                emailState.value === authCtx.email)
            }
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>SAVING...</span>
              </>
            ) : (
              'SAVE'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileInformation;
