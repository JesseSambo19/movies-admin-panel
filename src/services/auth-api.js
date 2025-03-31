import { handleAxiosError } from '../utils/handleAxiosError';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export const handleLogin = async (
  setUserName,
  email,
  password,
  getPathNameHandler,
  setIsLoggedIn,
  setIsLoggedOut,
  setIsVerified,
  navigate
) => {
  try {
    // Attempt to log the user in
    const response = await axiosInstance.post('login', {
      email,
      password,
    });

    // Save token and set login status
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('userName', response.data.user.name); // Store the user's name
    localStorage.setItem('isVerified', '0');
    setIsVerified(false);
    setIsLoggedIn(true);
    setIsLoggedOut(false); // if the user isn't logged in and they are accessing a page e.g. /add-movie, they will be redirected to /login and
    // the path/page where they were at before redirected to /login is saved in localStorage so when they login,
    // they will be redirected to path that was saved in localStorage

    localStorage.setItem('isVerified', '1');
    setUserName(response.data.user.name);
    setIsVerified(true); // the user is verified, hence they can be redirected to the home page
    alert('Logged in successfully!');

    // uncomment this code for email verification
    // Check if the user is verified
    // const verifyResponse = await axiosInstance.get('check-verification');
    // alert(verifyResponse.data.verified);

    // if (verifyResponse.data.verified) {
    //   // If user is verified, proceed with normal flow
    //   localStorage.setItem('isVerified', '1');
    //   getPathNameHandler();
    //   setUserName(response.data.user.name);
    //   setIsVerified(true); // the user is verified, hence they can be redirected to the home page
    //   alert('Logged in successfully!');
    // } else {
    //   // If user is not verified, redirect to verification page
    //   setIsVerified(false);
    //   alert('Your email is not verified. Please verify your email.');
    //   // navigate('/send-verification-email'); // Redirect to the page where they can resend the verification email
    // }
  } catch (error) {
    handleAxiosError(error);
    // alert('Invalid credentials');
  }
};

export const handleLogout = async (
  setIsLoggedIn,
  setIsLoggedOut,
  setUserName,
  setIsVerified
) => {
  try {
    await axiosInstance.post('logout');
    localStorage.removeItem('token'); // Remove the token on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('isVerified');
    setIsLoggedIn(false);
    setIsLoggedOut(true); // this ensures that when the user logs out, the path/page where they were at before redirected to /login
    //  isn't saved in localStorage so when they login again, they will be redirected to /home
    setUserName('');
    setIsVerified(false);
    // window.location.reload(); // Optionally reload the page after logout
    alert('Logged out successfully!');
  } catch (error) {
    handleAxiosError(error);
    alert('Logout failed');
  }
};

export const handleRegister = async (
  name,
  email,
  password,
  password_confirmation,
  navigate,
  getPathNameHandler,
  setIsLoggedIn,
  setIsLoggedOut
) => {
  try {
    // const response = await axiosInstance.post('register', {
    //   name,
    //   email,
    //   password,
    // });

    // alert(`Successfully registered. ${response.data}`);

    axios
      .post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((response) => {
        alert(response.data.message); // Check email for verification link
        navigate('/send-verification-email');
      })
      .catch((error) => {
        console.error(error.response.data);
      });

    // handleLogin(
    //   email,
    //   password,
    //   getPathNameHandler,
    //   setIsLoggedIn,
    //   setIsLoggedOut
    // );
  } catch (error) {
    handleAxiosError(error);
    // alert('Invalid credentials');
  }
};

export const handleForgotPassword = async (
  email
  // getPathNameHandler,
  // setIsLoggedIn,
  // setIsLoggedOut
) => {
  axios
    .post(`${API_URL}/forgot-password`, { email })
    .then((response) => {
      alert(response.data.message); // Password reset link sent
    })
    .catch((error) => {
      handleAxiosError(error);
      console.error(error);
    });
};

export const handleResetPassword = (
  email,
  token,
  password,
  password_confirmation,
  navigate
  // getPathNameHandler,
  // setIsLoggedIn,
  // setIsLoggedOut
) => {
  axios
    .post(`${API_URL}/reset-password`, {
      email,
      token,
      password,
      password_confirmation,
    })
    .then((response) => {
      alert(response.data.message); // Password reset successful
      navigate('/login');
    })
    .catch((error) => {
      handleAxiosError(error);
      console.error(error);
    });
};

// This should be called when the user clicks the verification link.
export const handleVerifyEmail = (userId, navigate) => {
  axios
    .get(`${API_URL}/verify-email/${userId}`)
    .then((response) => {
      alert(response.data.message); // Email verified successfully
      navigate('/login');
    })
    .catch((error) => {
      handleAxiosError(error);
      console.error(error);
    });
};

export const resendVerificationEmail = (email) => {
  axios
    .post(`${API_URL}/resend-email`, { email })
    .then((response) => {
      alert(response.data.message); // New verification email sent
    })
    .catch((error) => {
      handleAxiosError(error);
      console.error(error);
    });
};

export const handleVerifyToken = async (token, setIsLoggedIn) => {
  await axios
    .post('verify-token', { token })
    .then((response) => {
      if (response.data.isAuthenticated) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
      }
    })
    .catch((error) => {
      handleAxiosError(error);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    });
};
