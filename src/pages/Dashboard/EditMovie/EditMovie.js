import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import classes from './EditMovie.module.css';
import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button';
import { useParams } from 'react-router-dom';
import useApi from '../../../services/home-api';

function AddMovie() {
  // custom hook
  const { fetchMoviesHandler, editMovieHandler } = useApi();
  // Controlled input states
  const [movie, setMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: '',
  });

  // Validation state
  const [invalidInput, setInvalidInput] = useState({
    title: false,
    openingText: false,
    releaseDate: false,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // fetchMoviesHandler();
    fetchMoviesHandler(id, setMovie);
  }, [fetchMoviesHandler, id]);

  function submitHandler(event) {
    event.preventDefault();

    // Check if any field is empty
    const errors = {
      title: !movie.title.trim(),
      openingText: !movie.openingText.trim(),
      releaseDate: !movie.releaseDate,
    };

    setInvalidInput(errors);

    // Prevent submission if there are errors
    if (errors.title || errors.openingText || errors.releaseDate) {
      return;
    }

    // editMovieHandler(input);
    editMovieHandler(id, movie);
    console.log('edited new movie');
  }

  const inputChangeHandler = (field, value) => {
    // setInput((prevInput) => ({ ...prevInput, [field]: value }));
    setMovie((prevMovie) => {
      const updatedMovie = { ...prevMovie, [field]: value };
      setFormIsValid(
        updatedMovie.title.trim() !== '' &&
          updatedMovie.openingText.trim() !== '' &&
          updatedMovie.releaseDate !== ''
      );
      return updatedMovie;
    });

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      [field]: value.trim() === '', // `true` if empty, `false` if valid
    }));
  };

  // if a user cliked on an input and left it blank then the input will be invalid
  const handleBlur = (field, value) => {
    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      [field]: value.trim() === '', // If empty, set invalid
    }));

    setFormIsValid(
      movie.title.trim() !== '' &&
        movie.openingText.trim() !== '' &&
        movie.releaseDate !== ''
    );
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            invalidInput.title ? classes.invalid : ''
          }`}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={movie.title}
            onChange={(e) => inputChangeHandler('title', e.target.value)}
            onBlur={(e) => handleBlur('title', e.target.value)}
          />
        </div>

        <div
          className={`${classes.control} ${
            invalidInput.openingText ? classes.invalid : ''
          }`}
        >
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            rows="5"
            id="openingText"
            value={movie.openingText}
            onChange={(e) => inputChangeHandler('openingText', e.target.value)}
            onBlur={(e) => handleBlur('openingText', e.target.value)}
          ></textarea>
        </div>

        <div
          className={`${classes.control} ${
            invalidInput.releaseDate ? classes.invalid : ''
          }`}
        >
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            value={movie.releaseDate}
            onChange={(e) => inputChangeHandler('releaseDate', e.target.value)}
            onBlur={(e) => handleBlur('releaseDate', e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={!formIsValid}
        >
          Edit Movie
        </Button>
      </form>
    </Card>
  );
}

export default AddMovie;
