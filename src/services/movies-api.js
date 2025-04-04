import axios from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useLoading } from '../store/loading-context';

const useMoviesApi = () => {
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const fetchMoviesHandler = useCallback(
    async (
      id,
      view,
      setMovies,
      setError,
      page,
      setCurrentPage,
      setLastPage
    ) => {
      // if view is true, meaning this is for the view a movie
      // if (id === undefined || view) {
      setLoading(true);
      setError(null); // to clear out any previous errors we got
      // }
      try {
        let response;
        if (id !== undefined) {
          response = await axios.get(`${API_URL}/movies/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        } else {
          // more dynamic pagination links provided by Laravel
          response = await axios.get(`${API_URL}/movies?page=${page}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }

        const data = await response.data;
        console.log(data.data);

        if (id !== undefined) {
          setMovies(data);
        } else {
          setMovies(data.data);
          setCurrentPage(data.current_page);
          setLastPage(data.last_page); // Total pages
        }
      } catch (error) {
        if (id === undefined) {
          setError(error.message);
          // alert(error.response.status);
          // if view is true, meaning this is for viewing or editing a movie
        } else if (view) {
          setError(error.response.status);
          // alert(error.response.status);
        } else {
          handleAxiosError(error);
        }
      }
      // if view is true, meaning this is for viewing or editing a movie
      // if (id === undefined || view) {
      setLoading(false);
      // }
    },
    [setLoading]
  );

  const addMovieHandler = async (
    movie,
    setMovie,
    setInvalidInput,
    setIsLoading
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/movies`, movie, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.data;
      console.log(data.data);

      // Show success message
      alert(`${data.message}`);

      // Reset form after successful submission
      setMovie({ title: '', openingText: '', releaseDate: '' });
      setInvalidInput({ title: false, openingText: false, releaseDate: false });
    } catch (error) {
      handleAxiosError(error);
    }
    setIsLoading(false);
  };

  const editMovieHandler = async (id, movie, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/movies/${id}`, movie, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.data;
      console.log(data.data);

      // Show success message
      alert(`${data.message}`);

      navigate('/fetch-movies');
      // console.log(data);
    } catch (error) {
      // reusable error handler function
      handleAxiosError(error);
    }
    setIsLoading(false);
  };

  const deleteMovieHandler = async (id, undefinedID, setMovies, setError) => {
    try {
      const response = await axios.delete(`${API_URL}/movies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.data;
      console.log(data);

      // Show success message
      alert(`${data.message}`);

      fetchMoviesHandler(undefinedID, setMovies, setError);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const deleteViewedMovieHandler = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/movies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.data;
      console.log(data);

      // Show success message
      alert(`${data.message}`);
      navigate('/fetch-movies');
    } catch (error) {
      handleAxiosError(error);
    }
  };
  return {
    fetchMoviesHandler,
    addMovieHandler,
    editMovieHandler,
    deleteMovieHandler,
    deleteViewedMovieHandler,
  };
};

export default useMoviesApi;
