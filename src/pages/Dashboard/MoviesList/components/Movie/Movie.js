import React, { useState } from 'react';

import classes from './Movie.module.css';
import { Link } from 'react-router-dom';
import Button from '../../../../../components/UI/Button/Button';
import Modal from '../../../../../components/UI/Modal/Modal';

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
      {showModal && (
        <Modal onClose={closeModal}>
          <div style={{ backgroundColor: 'white' }}>
            <p style={{ textAlign: 'center' }}>
              Are you sure you want to delete this record {props.id}?
            </p>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <Button onClick={deleteMovie}>Ok</Button>
              <Button onClick={closeModal}>Cancel</Button>
            </span>
          </div>
        </Modal>
      )}

      <li className={classes.movie}>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        <Link to={`/edit-movie/${props.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={openModal}>Delete</Button>
      </li>
    </React.Fragment>
  );
};

export default Movie;
