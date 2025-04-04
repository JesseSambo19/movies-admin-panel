import React, { useEffect, useReducer, useRef, useState } from 'react';
import Card from '../../../../../components/UI/Card/Card';
import Input from '../../../../../components/UI/Input/Input';
import Button from '../../../../../components/UI/Button/Button';
import classes from './UpdatePassword.module.css';
import useProfileApi from '../../../../../services/profile-api';

// this reducer is created outside of the scope of this component because it doesn't need to interact with anything defined in the component
// all the data which will be required by this function will be passed  into this function when it's executed by React, automatically

const currentPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
};

const newPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
};

const confirmNewPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
};

const UpdatePassword = () => {
  const { updateUserPassword } = useProfileApi();
  const [formIsValid, setFormIsValid] = useState(false);

  const [currentPasswordState, dispatchCurrentPassword] = useReducer(
    currentPasswordReducer,
    {
      value: '',
      isValid: null,
    }
  );

  const [newPasswordState, dispatchNewPassword] = useReducer(
    newPasswordReducer,
    {
      value: '',
      isValid: null,
    }
  );

  const [confirmNewPasswordState, dispatchConfirmNewPassword] = useReducer(
    confirmNewPasswordReducer,
    {
      value: '',
      isValid: null,
    }
  );

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  // alias assignment
  // we  need the validity part as dependencies instead of the whole state object to ensure that useeffect only executes when the validation values change
  // this is destructuring the state object and giving it an alias as a new constant for dependency injection
  const { isValid: currentPasswordIsValid } = currentPasswordState;
  const { isValid: newPasswordIsValid } = newPasswordState;
  const { isValid: confirmNewPasswordIsValid } = confirmNewPasswordState;

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
        currentPasswordIsValid &&
          newPasswordIsValid &&
          confirmNewPasswordIsValid
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
  }, [currentPasswordIsValid, newPasswordIsValid, confirmNewPasswordIsValid]);
  // }, [emailState.isValid, passwordState.isValid]); // alternatively one can access the properties that need to be dependencies instead of the whole state object

  const currentPasswordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchCurrentPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         passwordState.value.trim().length > 6 && emailState.isValid

    // );
  };

  const newPasswordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchNewPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         passwordState.value.trim().length > 6 && emailState.isValid

    // );
  };

  const confirmPasswordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchConfirmNewPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         passwordState.value.trim().length > 6 && emailState.isValid

    // );
  };

  const validateCurrentPasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchCurrentPassword({ type: 'INPUT_BLUR' });
  };

  const validateNewPasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchNewPassword({ type: 'INPUT_BLUR' });
  };

  const validateConfirmNewPasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchConfirmNewPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPasswordState.value !== confirmNewPasswordState.value) {
      alert('Passwords do not match');
      return;
    }

    updateUserPassword(
      currentPasswordState.value,
      newPasswordState.value,
      confirmNewPasswordState.value,
      dispatchCurrentPassword,
      dispatchNewPassword,
      dispatchConfirmNewPassword
    );
  };

  return (
    <Card>
      <div>
        <h3>Update Password</h3>
        <p>
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          ref={currentPasswordInputRef}
          id="current-password"
          label="Current Password"
          type="password"
          isValid={currentPasswordIsValid}
          value={currentPasswordState.value}
          onChange={currentPasswordChangeHandler}
          onBlur={validateCurrentPasswordHandler}
        />
        <Input
          ref={newPasswordInputRef}
          id="new-password"
          label="New Password"
          type="password"
          isValid={newPasswordIsValid}
          value={newPasswordState.value}
          onChange={newPasswordChangeHandler}
          onBlur={validateNewPasswordHandler}
        />
        <Input
          ref={confirmNewPasswordInputRef}
          id="confirm-password"
          label="Confirm Password"
          type="password"
          isValid={confirmNewPasswordIsValid}
          value={confirmNewPasswordState.value}
          onChange={confirmPasswordChangeHandler}
          onBlur={validateConfirmNewPasswordHandler}
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

export default UpdatePassword;
