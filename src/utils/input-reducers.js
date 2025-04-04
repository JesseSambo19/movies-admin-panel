import { useState, useReducer, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// this reducer is created outside of the scope of this component because it doesn't need to interact with anything defined in the component
// all the data which will be required by this function will be passed  into this function when it's executed by React, automatically
export const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  //   return { value: '', isValid: false };
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  //   return { value: '', isValid: false };
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const nameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  //   return { value: '', isValid: false };
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const confirmPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 8,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length >= 8,
    };
  }
  //   return { value: '', isValid: false };
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const currentPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const newPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};

export const confirmNewPasswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  if (action.type === 'RESET') {
    return { value: '', isValid: null };
  }
  return state;
};
const useInputReducers = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') ?? null;

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: email ? email : '',
    isValid: email ? true : null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: null,
  });
  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    {
      value: '',
      isValid: null,
    }
  );

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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const nameInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmNewPasswordInputRef = useRef();

  // alias assignment
  // we  need the validity part as dependencies instead of the whole state object to ensure that useeffect only executes when the validation values change
  // this is destructuring the state object and giving it an alias as a new constant for dependency injection
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const { isValid: nameIsValid } = nameState;
  const { isValid: confirmPasswordIsValid } = confirmPasswordState;

  // useEffect helps us make sure that the code runs once the first time and then again only whenever one of the dependencies change
  // should help you execute code to response to something
  //   useEffect(() => {
  //     // debouncing is used to to ensure that this function is executed after 500 milliseconds to check for changes
  //     // this is helping for performance and unnecessary calls, especially for network traffic when
  //     // dealing with http requests
  //     // this now only executes once with every key stroke
  //     const identifier = setTimeout(() => {
  //       console.log('Checking for validity!');
  //       setFormIsValid(
  //         // enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //         // we're only checking for changes only with validations
  //         emailIsValid && passwordIsValid // login
  //         // emailIsValid && passwordIsValid && nameIsValid && confirmPasswordIsValid // register
  //         // emailIsValid && passwordIsValid && confirmPasswordIsValid // reset password
  //         // currentPasswordIsValid && newPasswordIsValid && confirmNewPasswordIsValid // update password
  //       );
  //     }, 500);
  //     // clean up function to remove the timer when the component is unmounted
  //     // it will only run after the useEffect is triggered for the first time (e.g. from the second run)
  //     // it runs before every new side effect execution
  //     return () => {
  //       console.log('CLEAN UP FUNCTION');
  //       // this will clear the timer set before this cleanup is triggered e.g the last side effect execution
  //       // so that when a new side effect execution is due, we can set a new timer
  //       clearTimeout(identifier);
  //     };
  //     // }, [enteredEmail, enteredPassword]);
  //     // we're only checking for changes only with validations
  //   }, [emailIsValid, passwordIsValid]); // login
  // }, [emailIsValid, passwordIsValid, nameIsValid, confirmPasswordIsValid]); // register
  // }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]); // reset password
  // }, [currentPasswordIsValid, newPasswordIsValid, confirmNewPasswordIsValid]); // update password

  // }, [emailState.isValid, passwordState.isValid]); // alternatively one can access the properties that need to be dependencies instead of the whole state object

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         emailState.value.includes('@') && passwordState.isValid

    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         passwordState.value.trim().length > 6 && emailState.isValid

    // );
  };

  const nameChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchName({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         emailState.value.includes('@') && passwordState.isValid

    // );
  };

  const confirmPasswordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchConfirmPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //         passwordState.value.trim().length > 6 && emailState.isValid

    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validateNameHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchName({ type: 'INPUT_BLUR' });
  };

  const validateConfirmPasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchConfirmPassword({ type: 'INPUT_BLUR' });
  };

  
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

  return {
    formIsValid,
    setFormIsValid,
    isLoading,
    setIsLoading,
    emailState,
    dispatchEmail,
    passwordState,
    dispatchPassword,
    nameState,
    dispatchName,
    confirmPasswordState,
    dispatchConfirmPassword,
    currentPasswordState,
    dispatchCurrentPassword,
    newPasswordState,
    dispatchNewPassword,
    confirmNewPasswordState,
    dispatchConfirmNewPassword,
    emailInputRef,
    passwordInputRef,
    nameInputRef,
    confirmPasswordInputRef,
    currentPasswordInputRef,
    newPasswordInputRef,
    confirmNewPasswordInputRef,
    emailIsValid,
    passwordIsValid,
    nameIsValid,
    confirmPasswordIsValid,
    emailChangeHandler,
    passwordChangeHandler,
    nameChangeHandler,
    confirmPasswordChangeHandler,
    currentPasswordChangeHandler,
    newPasswordChangeHandler,
    validateEmailHandler,
    validatePasswordHandler,
    validateNameHandler,
    validateConfirmPasswordHandler,
    validateCurrentPasswordHandler,
    validateNewPasswordHandler,
    validateConfirmNewPasswordHandler,
  };
};

export default useInputReducers;
