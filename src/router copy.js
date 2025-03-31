import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/Dashboard/NotFoundPage/NotFoundPage';
import AddMovie from './pages/Dashboard/AddMovie/AddMovie';
import EditMovie from './pages/Dashboard/EditMovie/EditMovie';
import MovieList from './pages/Dashboard/MoviesList/MoviesList';
import Home from './pages/Dashboard/Home/Home';
import Login from './pages/Authentication/Login/Login';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Register from './pages/Authentication/Register/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword/ResetPassword';
import VerifyEmail from './pages/Authentication/VerifyEmail/VerifyEmail';
import SendVerificationEmail from './pages/Authentication/SendVerificationEmail/SendVerificationEmail';
import Profile from './pages/Dashboard/Profile/Profile';
import VerifiedRoute from './components/VerifiedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedRoute />,
    // errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        element: <VerifiedRoute />,
        // errorElement: <ErrorElement />,
        children: [
          {
            element: <Layout />, // Protects the following routes
            children: [
              { path: '/home', element: <Home /> },
              { path: '/fetch-movies', element: <MovieList /> },
              { path: '/add-movie', element: <AddMovie /> },
              { path: '/edit-movie/:id', element: <EditMovie /> },
              { path: '/profile', element: <Profile /> },
              { path: '*', element: <NotFound /> },
            ],
          },
        ],
      },
      // Authentication routes
      { path: '/send-verification-email', element: <SendVerificationEmail /> }, // SendVerificationEmail is outside to prevent navbar/footer
    ],
  },
  // Authentication routes
  { path: '/login', element: <Login /> }, // Login is outside to prevent navbar/footer
  { path: '/register', element: <Register /> }, // Register is outside to prevent navbar/footer
  // { path: '/send-verification-email', element: <SendVerificationEmail /> }, // SendVerificationEmail is outside to prevent navbar/footer
  { path: '/verify-email/:id', element: <VerifyEmail /> }, // VerifyEmail is outside to prevent navbar/footer
  { path: '/forgot-password', element: <ForgotPassword /> }, // ForgotPassword is outside to prevent navbar/footer
  { path: '/reset-password/:token', element: <ResetPassword /> }, // ResetPassword is outside to prevent navbar/footer
]);

export default router;
