import React, { useState } from 'react';

import classes from './Movie.module.css';
import { Link } from 'react-router-dom';
import Button from '../../../../../../components/UI/Button/Button';
import DeleteModal from '../../../../../../components/DeleteModal/DeleteModal';

const Movie = (props) => {
  const [showModal, setShowModal] = useState(false);
  const deleteMovie = () => {
    props.onDeleteMovie(props.id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <DeleteModal
        showModal={showModal}
        onClose={closeModal}
        text="Are you sure you want to delete this record?"
        onDelete={deleteMovie}
      />

      <li className={classes.movie}>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        <Link to={`/view-movie/${props.id}`}>
          <Button>View</Button>
        </Link>
        <Link to={`/edit-movie/${props.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={openModal}>Delete</Button>
      </li>
    </React.Fragment>
  );
};

export default Movie;
