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
  navigate,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    // Attempt to log the user in
    const response = await axiosInstance.post('login', {
      email,
      password,
    });

    // Save token and set login status
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isLoggedIn', response.data.logged_in); // 1
    localStorage.setItem('userName', response.data.user.name); // Store the user's name
    localStorage.setItem('isVerified', response.data.verified ? '1' : '0'); // 1 or 0 for verified
    setIsLoggedIn(true); // true
    setIsVerified(response.data.verified); // true or false for verified
    setIsLoggedOut(false); // if the user isn't logged in and they are accessing a page e.g. /add-movie, they will be redirected to /login and
    // the path/page where they were at before redirected to /login is saved in localStorage so when they login,
    // they will be redirected to path that was saved in localStorage

    setUserName(response.data.user.name);
    alert('Logged in successfully!');
  } catch (error) {
    handleAxiosError(error);
    // alert('Invalid credentials');
  }
  setIsLoading(false);
};

export const handleLogout = async (
  setIsLoggedIn,
  setIsLoggedOut,
  setUserName,
  setIsVerified
) => {
  try {
    const response = await axiosInstance.post('logout');
    localStorage.clear(); // clear cache e.g token, isLoggedIn, isVerified, userName, email (if stored)
    setIsLoggedIn(false);
    setIsLoggedOut(true); // this ensures that when the user logs out, the path/page where they were at before redirected to /login
    //  isn't saved in localStorage so when they login again, they will be redirected to /home
    setUserName('');
    setIsVerified(false);
    // window.location.reload(); // Optionally reload the page after logout
    alert(response.data.message);
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
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post('register', {
      name,
      email,
      password,
      password_confirmation,
    });

    console.log(response);
    alert(response.data.message);
    navigate('/login');
  } catch (error) {
    handleAxiosError(error);
    // alert('Invalid credentials');
  }
  setIsLoading(false);
};

export const handleForgotPassword = async (
  email,
  setIsLoading,
  setSendLink
) => {
  setIsLoading(true);
  setSendLink(true);
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    alert(response.data.message); // Password reset link sent
    // alert('We have emailed your password reset link.');
  } catch (error) {
    handleAxiosError(error);
    console.error(error);
  }
  setIsLoading(false);
};

export const handleResetPassword = async (
  email,
  token,
  password,
  password_confirmation,
  navigate,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
      token,
      password,
      password_confirmation,
    });

    alert(response.data.message); // Password reset successful
    navigate('/login');
  } catch (error) {
    handleAxiosError(error);
    console.error(error);
  }
  setIsLoading(false);
};

// This should be called when the user clicks the verification link.
export const handleVerifyEmail = async (userId, navigate) => {
  try {
    const response = await axios.get(`${API_URL}/verify-email/${userId}`);

    alert(response.data.message); // Email verified successfully
    navigate('/login');
  } catch (error) {
    handleAxiosError(error);
    console.error(error);
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = axios.post(`${API_URL}/resend-email`, { email });

    alert(response.data.message); // New verification email sent
  } catch (error) {
    handleAxiosError(error);
    console.error(error);
  }
};

// OTP
export const handleSendOtp = async (setSendingOtp, setSendOtp) => {
  setSendingOtp(true);
  setSendOtp(true);
  try {
    // const email = localStorage.getItem('email');
    const response = await axios.post(
      `${API_URL}/send-otp`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    // setMessage(data.message);
    alert(response.data.message);
    console.log(response.data.message);
    setSendOtp(true); // when sent successfully, the state of send otp will change to resend otp
  } catch (error) {
    // setMessage("Failed to send OTP.");
    console.error(error);
    console.log(error);
    handleAxiosError(error);
  }
  setSendingOtp(false);
};

export const verifyOtp = async (otpCode, setIsVerified, setVerifyingOtp) => {
  setVerifyingOtp(true);
  try {
    console.log(`Verifying OTP ${otpCode}`);
    const response = await axios.post(
      `${API_URL}/verify-otp`,
      { otp: otpCode }, // send as a JSON object
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      // setMessage('Email verified successfully!');
      alert('Email verified successfully!');
      console.log(response.data.verified);
      localStorage.setItem('isVerified', response.data.verified); // 1
      setIsVerified(true);
      window.location.reload();
    } else {
      // setMessage(data.message || 'Invalid OTP');
      alert(response.data.message || 'Invalid OTP');
    }
  } catch (error) {
    // setMessage('An error occurred. Please try again.');
    handleAxiosError(error);
  }
  setVerifyingOtp(false);
};

export const handleVerifyToken = async (token, setIsLoggedIn) => {
  try {
    const response = await axios.post('verify-token', { token });
    if (response.data.isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    }
  } catch (error) {
    handleAxiosError(error);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  }
};
