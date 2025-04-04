import React, { useEffect, useState } from 'react';

import classes from './ViewMovie.module.css';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/UI/Button/Button';
import Card from '../../../../components/UI/Card/Card';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import useMoviesApi from '../../../../services/movies-api';
import Forbidden from '../../Errors/Forbidden/Forbidden';
import NotFoundPage from '../../Errors/NotFound/NotFound';

const ViewMovie = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // custom hook
  const { fetchMoviesHandler, deleteViewedMovieHandler } = useMoviesApi();
  // Controlled input states
  const [movie, setMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: '',
    created_at: '',
  });

  const deleteMovie = () => {
    deleteViewedMovieHandler(id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchMoviesHandler(id, true, setMovie, setError);
  }, [fetchMoviesHandler, id]);

  const formattedDate1 = new Date(movie.created_at).toLocaleString(); // converts into a more readable format
  const formattedDate2 = new Date(movie.updated_at).toLocaleString(); // converts into a more readable format

  return (
    <React.Fragment>
      {error === 403 ? (
        <Forbidden />
      ) : error === 404 ? (
        <NotFoundPage />
      ) : (
        /* (
        <>
          {isLoading ? (
            <Card>
              <p>Loading...</p>
            </Card>
          ) :  */
        <>
          <DeleteModal
            showModal={showModal}
            onClose={closeModal}
            text="Are you sure you want to delete this record?"
            onDelete={deleteMovie}
          />
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ textAlign: 'left' }}>
                <b>Date Created:</b> {formattedDate1}
              </p>
              <p style={{ textAlign: 'left' }}>
                <b>Date Updated:</b> {formattedDate2}
              </p>
            </div>
            <li className={classes.movie}>
              <h2>{movie.title}</h2>
              <h3>{movie.releaseDate}</h3>
              <p>{movie.openingText}</p>
              <Link to={`/edit-movie/${movie.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={openModal}>Delete</Button>
            </li>
          </Card>
        </>
        /* )}
        </> */
      )}
    </React.Fragment>
  );
};

export default ViewMovie;
