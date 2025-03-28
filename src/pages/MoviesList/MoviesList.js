import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

import Movie from './components/Movie/Movie';
import classes from './MoviesList.module.css';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
// import { handleAxiosError } from '../../utils/handleAxiosError';
import useApi from '../../services/home-api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // custom hook
  const { fetchMoviesHandler, deleteMovieHandler } = useApi();

  // since I need parameters for fetching the data when pressing on the fetch movies button and loading this page with useEffect
  // I'm using this function for reusability to pass in those parameters to fetchMoviesHandler
  const onFetchMoviesHandler = useCallback(() => {
    fetchMoviesHandler(undefined, setMovies, setIsLoading, setError);
  }, [fetchMoviesHandler]);

  useEffect(() => {
    onFetchMoviesHandler();
  }, [onFetchMoviesHandler]);

  // since I need parameters for fetching the data again after successfully deleting a record
  // I'm using this function to pass in those parameters to deleteMovieHandler
  const onDeleteMovieHandler = (movieID) => {
    deleteMovieHandler(movieID, undefined, setMovies, setIsLoading, setError);
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
            onDeleteMovie={onDeleteMovieHandler}
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
        <Button onClick={onFetchMoviesHandler}>Fetch Movies</Button>
      </Card>
      <Card>{content}</Card>
    </React.Fragment>
  );
};

export default MovieList;
