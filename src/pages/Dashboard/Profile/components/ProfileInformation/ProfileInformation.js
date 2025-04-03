import React, { useEffect, useReducer, useRef, useState } from 'react';
import Card from '../../../../../components/UI/Card/Card';
import Input from '../../../../../components/UI/Input/Input';
import Button from '../../../../../components/UI/Button/Button';
import classes from './ProfileInformation.module.css';
import useProfileApi from '../../../../../services/profile-api';

const nameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val || '', isValid: !!action.val };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: !!state.value };
  }
  return { value: '', isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val || '',
      isValid: action.val?.includes('@') || false,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value?.includes('@') || false };
  }
  return { value: '', isValid: false };
};

const ProfileInformation = () => {
  const { fetchUserProfile, updateUserProfile } = useProfileApi();
  const [formIsValid, setFormIsValid] = useState(false);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    fetchUserProfile(dispatchName, dispatchEmail);
  }, [fetchUserProfile]);

  const nameInputRef = useRef();
  const emailInputRef = useRef();

  // alias assignment
  // we  need the validity part as dependencies instead of the whole state object to ensure that useeffect only executes when the validation values change
  // this is destructuring the state object and giving it an alias as a new constant for dependency injection
  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;

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
  }, [nameIsValid, emailIsValid]);
  // }, [emailState.isValid, passwordState.isValid]); // alternatively one can access the properties that need to be dependencies instead of the whole state object

  const nameChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchName({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         emailState.value.includes('@') && passwordState.isValid

    // );
  };

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         emailState.value.includes('@') && passwordState.isValid

    // );
  };

  const validateNameHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchName({ type: 'INPUT_BLUR' });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    if (formIsValid) {
      // authCtx.onLogin(nameState.value, emailState.value, navigate);
      updateUserProfile(nameState.value, emailState.value);
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
            disabled={!formIsValid}
          >
            SAVE
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileInformation;
