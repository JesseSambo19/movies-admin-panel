import React, { useState, useEffect, useCallback } from 'react';
import Movie from './components/Movie/Movie';
import classes from './MoviesList.module.css';
import Card from '../../../../components/UI/Card/Card';
import Button from '../../../../components/UI/Button/Button';
import useMoviesApi from '../../../../services/movies-api';
import Pagination from '../../../../components/Pagination/Pagination';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // Total pages
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    deleteMovieHandler(
      movieID,
      undefined,
      false,
      setMovies,
      setError,
      currentPage,
      setCurrentPage,
      setLastPage,
      setIsLoading,
      // setShowModal/
    );
  };

  const onDeleteAllMoviesHandler = () => {
    deleteMovieHandler(
      undefined,
      undefined,
      false,
      setMovies,
      setError,
      currentPage,
      setCurrentPage,
      setLastPage,
      setIsLoading,
      setShowModal
    );
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
      <DeleteModal
        showModal={showModal}
        onClose={closeModal}
        text="Are you sure you want to delete all records?"
        onDelete={onDeleteAllMoviesHandler}
        isLoading={isLoading}
      />
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={onFetchMoviesHandler}>Fetch Movies</Button>
          {movies.length >= 2 && (
            <Button
              className={classes.btn}
              onClick={openModal}
            >
              Delete All Movies
            </Button>
          )}
        </div>
      </Card>
      <Card>{content}</Card>
      {/* Pagination Controls */}
      {/* {lastPage > 1 && ( */}
      <Pagination
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
      {/* )} */}
    </React.Fragment>
  );
};

export default MovieList;
