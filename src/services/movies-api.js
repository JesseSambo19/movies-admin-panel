import axios from 'axios';
import useErrorHandler, { notifySuccess } from '../utils/handleAxiosFeedback';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { useLoading } from '../store/loading-context';

const useMoviesApi = () => {
  const { setLoading } = useLoading();
  const { handleAxiosError } = useErrorHandler();
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
          // setError(error.message);
          setError('Something went wrong.');
          // alert(error.response.status);
          // if view is true, meaning this is for viewing or editing a movie
        } else if (view) {
          setError(error.response.status);
          // alert(error.response.status);
        }
        // else {
        //   handleAxiosError(error);
        // }
        handleAxiosError(error);
      } finally {
        // if view is true, meaning this is for viewing or editing a movie
        // if (id === undefined || view) {
        setLoading(false); // ✅ This always runs, even if an error occurs
        // }
      }
    },
    [setLoading, handleAxiosError]
  );

  const addMovieHandler = async (
    movie,
    setMovie,
    setInvalidInput,
    setFormIsValid,
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
      // alert(`${data.message}`);
      notifySuccess(data.message);

      // Reset form after successful submission
      setMovie({ title: '', openingText: '', releaseDate: '' });
      setInvalidInput({ title: false, openingText: false, releaseDate: false });
      setFormIsValid(false);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
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
      // alert(`${data.message}`);
      notifySuccess(data.message);

      navigate('/fetch-movies');
      // console.log(data);
    } catch (error) {
      // reusable error handler function
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMovieHandler = async (
    id,
    undefinedID,
    view,
    setMovies,
    setError,
    page,
    setCurrentPage,
    setLastPage,
    setIsLoading,
    setShowModal
  ) => {
    setIsLoading(true);
    try {
      let response;
      if (id !== undefined) {
        response = await axios.delete(`${API_URL}/movies/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        response = await axios.delete(`${API_URL}/movies/delete-all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      const data = await response.data;
      console.log(data);

      // Show success message
      // alert(`${data.message}`);
      notifySuccess(data.message);

      if (id === undefined) {
        setShowModal(false);
      }

      fetchMoviesHandler(
        undefinedID,
        view,
        setMovies,
        setError,
        page,
        setCurrentPage,
        setLastPage
      );
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteViewedMovieHandler = async (id, setIsLoading) => {
    setIsLoading(true);
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
      // alert(`${data.message}`);
      notifySuccess(data.message);
      navigate('/fetch-movies');
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
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
