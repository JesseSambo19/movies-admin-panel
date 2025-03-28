import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './EditMovie.module.css';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import { Navigate, useParams } from 'react-router-dom';
import { handleAxiosError } from '../../utils/handleAxiosError';

function AddMovie() {
  // Controlled input states
  const [input, setInput] = useState({
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

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // to clear out any previous errors we got
    try {
      console.log('ID: ', id);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/movies/${id}`
      );

      const data = await response.data;
      console.log(data);

      setInput(data);
    } catch (error) {
      setError(error.message);
      handleAxiosError(error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const editMovieHandler = async (movie) => {
    try {
      // const response = await axios.put(
      //   `https://react-http-92529-default-rtdb.firebaseio.com/movies.json/${id}`,
      //   movie
      // );
      // const data = await response.data;

      const response = await axios.put(
        `http://127.0.0.1:8000/api/movies/${id}`,
        movie
      );

      const data = await response.data;
      console.log(data.data);
      // console.log(response.data);

      // Show success message
      alert(`${data.message}`);

      // Reset form after successful submission
      // setInput({ title: '', openingText: '', releaseDate: '' });
      // setInvalidInput({ title: false, openingText: false, releaseDate: false });
      return <Navigate to="/fetch-movies" />;
      // console.log(data);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    // Check if any field is empty
    const errors = {
      title: !input.title.trim(),
      openingText: !input.openingText.trim(),
      releaseDate: !input.releaseDate,
    };

    setInvalidInput(errors);

    // Prevent submission if there are errors
    if (errors.title || errors.openingText || errors.releaseDate) {
      return;
    }

    editMovieHandler(input);
    console.log('submitted new movie');

    // Reset form after successful submission
    // setInput({ title: '', openingText: '', releaseDate: '' });
    // setInvalidInput({ title: false, openingText: false, releaseDate: false });
  }

  // const inputChangeHandler = (input, value) => {
  //   setInput((prevInput) => ({ ...prevInput, [input]: value }));
  //   if (value.trim()) {
  //     setInvalidInput((prevInvalidInput) => ({
  //       ...prevInvalidInput,
  //       [input]: false,
  //     }));
  //   }
  // };

  const inputChangeHandler = (field, value) => {
    // setInput((prevInput) => ({ ...prevInput, [field]: value }));
    setInput((prevInput) => {
      const updatedInput = { ...prevInput, [field]: value };
      setFormIsValid(
        updatedInput.title.trim() !== '' &&
          updatedInput.openingText.trim() !== '' &&
          updatedInput.releaseDate !== ''
      );
      return updatedInput;
    });

    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      [field]: value.trim() === '', // `true` if empty, `false` if valid
    }));
  };

  const handleBlur = (field, value) => {
    setInvalidInput((prevInvalidInput) => ({
      ...prevInvalidInput,
      [field]: value.trim() === '', // If empty, set invalid
    }));

    setFormIsValid(
      input.title.trim() !== '' &&
        input.openingText.trim() !== '' &&
        input.releaseDate !== ''
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
            value={input.title}
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
            value={input.openingText}
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
            value={input.releaseDate}
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
