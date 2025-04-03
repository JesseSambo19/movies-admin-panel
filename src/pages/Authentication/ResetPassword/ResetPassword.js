import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './ResetPassword.module.css';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../store/auth-context';
import Input from '../../../components/UI/Input/Input';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Center from '../../../components/UI/Center/Center';

// this reducer is created outside of the scope of this component because it doesn't need to interact with anything defined in the component
// all the data which will be required by this function will be passed  into this function when it's executed by React, automatically
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length >= 8 };
  }
  return { value: '', isValid: false };
};

const confirmPasswordReducer = (state, action) => {
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
  return { value: '', isValid: false };
};

const ResetPassword = () => {
  const location = useLocation();
  const { token } = useParams(); // Get the token from the path
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: email,
    isValid: true,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
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

  const authCtx = useAuth();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const confirmPasswordInputRef = useRef();

  // alias assignment
  // we  need the validity part as dependencies instead of the whole state object to ensure that useeffect only executes when the validation values change
  // this is destructuring the state object and giving it an alias as a new constant for dependency injection
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const { isValid: confirmPasswordIsValid } = confirmPasswordState;

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
        emailIsValid && passwordIsValid && confirmPasswordIsValid
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
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);
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

  //   else if (authCtx.isLoggedIn && authCtx.pathName !== '') {
  //     console.log(
  //       `Redirecting user to: ${authCtx.pathName} after successful login`
  //     );
  //     navigate(authCtx.pathName); // ✅ Redirect logged-in users
  //     authCtx.onRemovePathName(); // the path name that was stored in localStorage will be removed upon successful login
  //     // return (
  //     //   <Navigate
  //     //     to={authCtx.pathName}
  //     //     replace
  //     //   />
  //     // ); // ✅ Redirect logged-in users
  //   }

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

  const validateConfirmPasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchConfirmPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
    // if (passwordState.value !== confirmPasswordState) {
    //   alert("Password and Confirm Password don't math");
    //   return;
    // }

    if (formIsValid) {
      authCtx.onResetPassword(
        emailState.value,
        token,
        passwordState.value,
        confirmPasswordState.value,
        navigate
      );
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
    <Center>
      <Card className={classes['reset-password']}>
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
          <Input
            ref={confirmPasswordInputRef}
            id="confirm_password"
            label="Confirm Password"
            type="password"
            isValid={confirmPasswordIsValid}
            value={confirmPasswordState.value}
            onChange={confirmPasswordChangeHandler}
            onBlur={validateConfirmPasswordHandler}
          />
          <div className={classes.actions}>
            <Button
              type="submit"
              //   className={classes.btn}
              disabled={!formIsValid}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </Card>
    </Center>
  );
};

export default ResetPassword;
