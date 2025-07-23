import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout1, Layout2 } from './components/Layout/Layout';
import NotFound from './pages/Dashboard/Errors/NotFound/NotFound';
import AddMovie from './pages/Dashboard/Movies/AddMovie/AddMovie';
import ViewMovie from './pages/Dashboard/Movies/ViewMovie/ViewMovie';
import EditMovie from './pages/Dashboard/Movies/EditMovie/EditMovie';
import MovieList from './pages/Dashboard/Movies/MoviesList/MoviesList';
import Home from './pages/Dashboard/Home/Home';
import Login from './pages/Authentication/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Authentication/Register/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword/ResetPassword';
import SendVerificationEmail from './pages/Authentication/SendVerificationEmail/SendVerificationEmail';
import Profile from './pages/Dashboard/Profile/Profile';
import { useAuth } from './store/auth-context';
import Redirect from './components/Redirect';

const useRouter = () => {
  const authCtx = useAuth();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />,
      // errorElement: <ErrorElement />,
      children: [
        {
          element: authCtx.isVerified ? <Layout1 /> : <Layout2 />, // Protects the following routes
          children: [
            {
              path: '/home',
              element: authCtx.isVerified ? (
                <Home />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '/fetch-movies',
              element: authCtx.isVerified ? (
                <MovieList />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '/add-movie',
              element: authCtx.isVerified ? (
                <AddMovie />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '/view-movie/:id',
              element: authCtx.isVerified ? (
                <ViewMovie />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '/edit-movie/:id',
              element: authCtx.isVerified ? (
                <EditMovie />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '/profile',
              element: authCtx.isVerified ? (
                <Profile />
              ) : (
                <SendVerificationEmail />
              ),
            },
            {
              path: '*',
              element: authCtx.isVerified ? <NotFound /> : <Redirect />,
            },
          ],
        },
      ],
    },
    // Authentication
    { path: '/login', element: <Login /> }, // Login is outside to prevent navbar/footer
    { path: '/register', element: <Register /> }, // Register is outside to prevent navbar/footer
    // { path: '/send-verification-email', element: <SendVerificationEmail /> }, // SendVerificationEmail is outside to prevent navbar/footer
    { path: '/forgot-password', element: <ForgotPassword /> }, // ForgotPassword is outside to prevent navbar/footer
    { path: '/reset-password/:token', element: <ResetPassword /> }, // ResetPassword is outside to prevent navbar/footer
  ]);

  return router;
};

export default useRouter;
