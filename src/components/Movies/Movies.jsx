import React, { useState, useEffect } from "react";

import "./Movies.css";

import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useWidthResize from "../../hooks/useWindowSize";
import { getMovies } from "../../utils/MoviesApi";
import { saveMovie, deleteMovie } from "../../utils/MainApi";

import {
  LARGE_RESOLUTION,
  SMALL_RESOLUTION,
  LARGE_RESOLUTION_MOVIES_SET,
  LARGE_RESOLUTION_MOVIES_ADD,
  MEDIUM_RESOLUTION_MOVIES_SET,
  MEDIUM_RESOLUTION_MOVIES_ADD,
  SMALL_RESOLUTION_MOVIES_SET,
  SMALL_RESOLUTION_MOVIES_ADD,
  SHORT_MOVIE_DURATION,
} from "../../utils/constants";

function Movies({ savedMovies, setSavedMovies }) {
  const [shortMoviesChexbox, setShortMoviesChexbox] = useState(false);
  const [renderingMovies, setRenderingMovies] = useState([]);
  const [previousFilter, setPreviousFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [moviesQuantity, setMoviesQuantity] = useState(0);
  const [addMoviesQuantity, setAddMoviesQuantity] = useState(0);
  const [pageMovies, setPageMovies] = useState(0);
  const moviesCount = moviesQuantity + addMoviesQuantity * pageMovies;
  const width = useWidthResize();

  const allData = localStorage.getItem("allData");

  const nothingVisible = renderingMovies.length === 0 && allData && !isLoading;

  let allMoviesLocal = localStorage.getItem("allDownloadedMovies");
  let searchedMovies = JSON.parse(allData)?.searchedMovies || [];
  let searchedShortMovies = JSON.parse(allData)?.searchedShortMovies || [];

  const handlerClick = async (shortMoviesChexbox, filter) => {
    try {
      setIsLoading(true);
      const allDownloadedMovies = await getMovies();
      localStorage.setItem(
        "allDownloadedMovies",
        JSON.stringify(allDownloadedMovies)
      );
      allMoviesLocal = localStorage.getItem("allDownloadedMovies");
      searchedMovies = JSON.parse(allMoviesLocal).filter((movie) =>
        movie.nameRU.toLowerCase().includes(filter.toLowerCase())
      );
      searchedShortMovies = searchedMovies.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION
      );
      const allData = {
        filter,
        shortMoviesChexbox,
        searchedMovies,
        searchedShortMovies,
      };
      localStorage.setItem("allData", JSON.stringify(allData));
      setPageMovies(0);
      if (shortMoviesChexbox) {
        setRenderingMovies(searchedShortMovies.slice(0, moviesQuantity));
      } else {
        setRenderingMovies(searchedMovies.slice(0, moviesQuantity));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shortMoviesChexbox) {
      setRenderingMovies(searchedShortMovies.slice(0, moviesCount));
    } else {
      setRenderingMovies(searchedMovies.slice(0, moviesCount));
    }
  }, [shortMoviesChexbox, moviesCount]);

  useEffect(() => {
    console.log(previousFilter);
    if (allData) {
      setPreviousFilter(JSON.parse(allData).filter);
      setShortMoviesChexbox(JSON.parse(allData).shortMoviesChexbox);
    }
  }, []);

  useEffect(() => {
    if (allData) {
      const newData = JSON.parse(allData);
      newData.shortMoviesChexbox = shortMoviesChexbox;
      localStorage.setItem("allData", JSON.stringify(newData));
    }
  }, [shortMoviesChexbox, allData]);

  useEffect(() => {
    if (width >= LARGE_RESOLUTION) {
      setMoviesQuantity(LARGE_RESOLUTION_MOVIES_SET);
      setAddMoviesQuantity(LARGE_RESOLUTION_MOVIES_ADD);
    } else if (width < LARGE_RESOLUTION && width > SMALL_RESOLUTION) {
      setMoviesQuantity(MEDIUM_RESOLUTION_MOVIES_SET);
      setAddMoviesQuantity(MEDIUM_RESOLUTION_MOVIES_ADD);
    } else {
      setMoviesQuantity(SMALL_RESOLUTION_MOVIES_SET);
      setAddMoviesQuantity(SMALL_RESOLUTION_MOVIES_ADD);
    }
  }, [width]);

  const moreButtonClick = () => {
    console.log(moviesCount);
    setPageMovies((prev) => prev + 1);
  };

  // создание фильма
  const createMovie = (movie, likeMovie) => {
    saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        likeMovie(true);
      })
      .catch((error) => console.log(error));
  };

  // удаление фильма
  const deleteMovieFromDB = (movieId, likeMovie) => {
    const searchedMovie = savedMovies.find(
      (movie) => movie.movieId === movieId
    );
    const idInSaved = searchedMovie._id;
    deleteMovie(idInSaved, likeMovie)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== idInSaved));
        likeMovie(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="movies">
      <SearchForm
        handlerClick={handlerClick}
        shortMoviesChexbox={shortMoviesChexbox}
        setShortMoviesChexbox={setShortMoviesChexbox}
        previousFilter={previousFilter}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        renderingMovies.length !== 0 && (
          <MoviesCardList
            moviesArr={renderingMovies}
            likeHandler={createMovie}
            savedMovies={savedMovies}
            deleteMovieFromDB={deleteMovieFromDB}
            moreButtonClick={moreButtonClick}
            moviesCount={moviesCount}
            searchedMovies={searchedMovies}
            searchedShortMovies={searchedShortMovies}
            shortMoviesChexbox={shortMoviesChexbox}
          />
        )
      )}
      {nothingVisible && (
        <h3 className="movies__search-not-found">
          Приехали! Ничего не найдено! :(
        </h3>
      )}
    </section>
  );
}

export default Movies;
