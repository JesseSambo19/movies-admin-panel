import { handleAxiosError } from '../utils/handleAxiosError';
import axiosInstance from '../utils/axios';
import axios from 'axios';

export const handleLogin = async (
  email,
  password,
  getPathNameHandler,
  setIsLoggedIn,
  setIsLoggedOut
) => {
  try {
    const response = await axiosInstance.post('login', {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token); // Store the token
    getPathNameHandler();
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
    setIsLoggedOut(false); // if the user isn't logged in and they are accessing a page e.g. /add-movie, they will be redirected to /login and
    // the path/page where they were at before redirected to /login is saved in localStorage so when they login,
    // they will be redirected to path that was saved in localStorage
    alert('Logged in successfully!');
  } catch (error) {
    handleAxiosError(error);
    alert('Invalid credentials');
  }
};

export const handleLogout = async (setIsLoggedIn, setIsLoggedOut) => {
  try {
    await axiosInstance.post('logout');
    localStorage.removeItem('token'); // Remove the token on logout
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsLoggedOut(true); // this ensures that when the user logs out, the path/page where they were at before redirected to /login
    //  isn't saved in localStorage so when they login again, they will be redirected to /home
    alert('Logged out successfully!');
  } catch (error) {
    handleAxiosError(error);
    alert('Logout failed');
  }
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
