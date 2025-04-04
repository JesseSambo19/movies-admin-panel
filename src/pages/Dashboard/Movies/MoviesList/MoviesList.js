import React, { useState, useEffect, useCallback } from 'react';
import Movie from './components/Movie/Movie';
import classes from './MoviesList.module.css';
import Card from '../../../../components/UI/Card/Card';
import Button from '../../../../components/UI/Button/Button';
import useMoviesApi from '../../../../services/movies-api';
import Pagination from '../../../../components/Pagination/Pagination';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // Total pages
  const [error, setError] = useState(null);
  // custom hook
  const { fetchMoviesHandler, deleteMovieHandler } = useMoviesApi();

  // since I need parameters for fetching the data when pressing on the fetch movies button and loading this page with useEffect
  // I'm using this function for reusability to pass in those parameters to fetchMoviesHandler
  const onFetchMoviesHandler = useCallback(() => {
    fetchMoviesHandler(
      undefined,
      false,
      setMovies,
      setError,
      currentPage,
      setCurrentPage,
      setLastPage
    );
  }, [fetchMoviesHandler, currentPage]);

  useEffect(() => {
    onFetchMoviesHandler();
  }, [onFetchMoviesHandler, currentPage]);

  // since I need parameters for fetching the data again after successfully deleting a record
  // I'm using this function to pass in those parameters to deleteMovieHandler
  const onDeleteMovieHandler = (movieID) => {
    deleteMovieHandler(movieID, undefined, setMovies, setError);
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

  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // }
  return (
    <React.Fragment>
      <Card>
        <Button onClick={onFetchMoviesHandler}>Fetch Movies</Button>
      </Card>
      <Card>{content}</Card>
      {/* Pagination Controls */}
      {lastPage > 1 && (
        <Pagination
          currentPage={currentPage}
          onSetCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      )}
    </React.Fragment>
  );
};

export default MovieList;
