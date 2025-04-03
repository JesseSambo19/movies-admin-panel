import axios from 'axios';
import { API_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/`, // Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // If using authentication (Laravel Sanctum)
  withCredentials: false,
});

// Interceptor to attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/', // Your API URL
// });

// // Set up an Axios interceptor to catch 401 errors (unauthorized)
// axiosInstance.interceptors.response.use(
//   response => response, // pass through successful responses
//   error => {
//     const history = useHistory();

//     if (error.response && error.response.status === 401) {
//       // Token expired or invalid, handle logout or redirect
//       console.log('Token expired or invalid');
//       localStorage.removeItem('auth_token'); // Remove invalid token
//       history.push('/login'); // Redirect to the login page
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
