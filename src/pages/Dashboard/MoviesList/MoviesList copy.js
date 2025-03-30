import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Movie from './components/Movie/Movie';
import classes from './MoviesList.module.css';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import { handleAxiosError } from '../../utils/handleAxiosError';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // to clear out any previous errors we got
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/movies');

      const data = await response.data;
      console.log(data);

      setMovies(data);
    } catch (error) {
      setError(error.message);
      handleAxiosError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const deleteMovieHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/movies/${id}`
      );

      const data = await response.data;
      console.log(data);

      // Show success message
      alert(`${data.message}`);

      fetchMoviesHandler();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = (
      <ul className={classes['movies-list']}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
            onDeleteMovie={deleteMovieHandler}
          />
        ))}
      </ul>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <Card>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </Card>
      <Card>{content}</Card>
    </React.Fragment>
  );
};

export default MovieList;
