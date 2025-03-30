import React, { useState, useEffect, useCallback } from 'react';
import Movie from './components/Movie/Movie';
import classes from './MoviesList.module.css';
import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import useApi from '../../../services/home-api';

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

// Pagination
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MoviesList = () => {
//   const [movies, setMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1); // Total pages

//   useEffect(() => {
//     fetchMovies(currentPage);
//   }, [currentPage]);

//   const fetchMovies = async (page) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/movies?page=${page}`);
//       setMovies(response.data.data);
//       setLastPage(response.data.last_page); // Total pages
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };

// // more dynamic pagination links provided by Laravel
// const fetchMovies = async (page) => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/movies?page=${page}`);
//     setMovies(response.data.data);
//     setCurrentPage(response.data.current_page);
//     setLastPage(response.data.last_page);
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//   }
// };

//   const nextPage = () => {
//     if (currentPage < lastPage) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div>
//       <h2>Movies List</h2>
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.id}>{movie.title}</li>
//         ))}
//       </ul>

//       {/* Pagination Controls */}
//       <button onClick={prevPage} disabled={currentPage === 1}>
//         Previous
//       </button>
//       <span> Page {currentPage} of {lastPage} </span>
//       <button onClick={nextPage} disabled={currentPage === lastPage}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default MoviesList;
