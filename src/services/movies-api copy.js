const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null); // to clear out any previous errors we got
  try {
    // const response = await axios.get('https://swapi.dev/api/films/', {});
    const response = await axios.get(
      'https://react-http-92529-default-rtdb.firebaseio.com/movies.json'
    );

    const data = await response.data;

    //     // const transformedMovies = data.map((movieData) => {
    //     //   return {
    //     //     id: movieData.episode_id,
    //     //     title: movieData.title,
    //     //     openingText: movieData.opening_crawl,
    //     //     releaseDate: movieData.release_date,
    //     //   };
    //     // });
    //     // setMovies(transformedMovies);

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }
    setMovies(loadedMovies);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}, []);

useEffect(() => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);

const addMovieHandler = async (movie) => {
  try {
    const response = await axios.post(
      'https://react-http-92529-default-rtdb.firebaseio.com/movies.json',
      movie
    );
    const data = await response.data;
    console.log(data);
    fetchMoviesHandler();
  } catch (error) {
    alert(error);
  }
};

// eslint-disable-next-line
const editMovieHandler = async (movie) => {
  try {
    const response = await axios.put(
      `https://react-http-92529-default-rtdb.firebaseio.com/movies.json/${movie.id}`,
      movie
    );
    const data = await response.data;
    console.log(data);
    fetchMoviesHandler();
  } catch (error) {
    alert(error);
  }
};

// eslint-disable-next-line
const deleteMovieHandler = async (movie) => {
  try {
    const response = await axios.delete(
      `https://react-http-92529-default-rtdb.firebaseio.com/movies.json/${movie.id}`
    );
    const data = await response.data;
    console.log(data);
    fetchMoviesHandler();
  } catch (error) {
    alert(error);
  }
};

export default [
  fetchMoviesHandler,
  addMovieHandler,
  editMovieHandler,
  deleteMovieHandler,
];
