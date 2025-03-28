import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import AddMovie from './pages/AddMovie/AddMovie';
import EditMovie from './pages/EditMovie/EditMovie';
import MovieList from './pages/MoviesList/MoviesList';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />, // Protects the following routes
        children: [
          { path: '/home', element: <Home /> },
          { path: '/fetch-movies', element: <MovieList /> },
          { path: '/add-movie', element: <AddMovie /> },
          { path: '/edit-movie/:id', element: <EditMovie /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> }, // Login is outside to prevent navbar/footer
]);

export default router;