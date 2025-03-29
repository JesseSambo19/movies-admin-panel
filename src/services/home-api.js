import axios from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constants';

const useApi = () => {
  const navigate = useNavigate();
  const fetchMoviesHandler = useCallback(
    async (id, setMovies, setIsLoading, setError) => {
      if (id === undefined) {
        setIsLoading(true);
        setError(null); // to clear out any previous errors we got
      }
      try {
        let response;
        if (id !== undefined) {
          response = await axios.get(`${API_URL}/movies/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        } else {
          response = await axios.get(`${API_URL}/movies`, {
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
        }
      } catch (error) {
        if (id === undefined) {
          setError(error.message);
        } else {
          handleAxiosError(error);
        }
      }
      if (id === undefined) {
        setIsLoading(false);
      }
    },
    []
  );

  const addMovieHandler = async (movie, setMovie, setInvalidInput) => {
    try {
      const response = await axios.post(`${API_URL}/movies`, movie, {
        headers: {
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
  };

  const editMovieHandler = async (id, movie) => {
    try {
      const response = await axios.put(`${API_URL}/movies/${id}`, movie, {
        headers: {
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
  };

  const deleteMovieHandler = async (
    id,
    undefinedID,
    setMovies,
    setIsLoading,
    setError
  ) => {
    try {
      const response = await axios.delete(`${API_URL}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.data;
      console.log(data);

      // Show success message
      alert(`${data.message}`);

      fetchMoviesHandler(undefinedID, setMovies, setIsLoading, setError);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  return {
    fetchMoviesHandler,
    addMovieHandler,
    editMovieHandler,
    deleteMovieHandler,
  };
};

export default useApi;
