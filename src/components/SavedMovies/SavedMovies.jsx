import React, { useEffect, useState } from "react";

import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { deleteMovie } from "../../utils/MainApi";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({ loggedIn, savedMovies, setSavedMovies }) {
  const [savedMoviesForRender, setSavedMoviesForRender] = useState(savedMovies);
  const [shortMoviesChexbox, setShortMoviesChexbox] = useState(false);

  const handlerClick = (shortMoviesChexbox, filter) => {
    console.log(filter);
    const filteredSavedMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(filter.toLowerCase())
    );
    const filteredSavedShortMovies = filteredSavedMovies.filter(
      (movie) => movie.duration <= SHORT_MOVIE_DURATION
    );
    if (shortMoviesChexbox) {
      setSavedMoviesForRender(
        setSavedMoviesForRender(filteredSavedShortMovies)
      );
    } else {
      setSavedMoviesForRender(filteredSavedMovies);
    }
  };

  // удаление фильма из сохраненных
  const deleteMovieFromDB = (movieId, likeMovie) => {
    deleteMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        likeMovie(false);
        setSavedMoviesForRender((state) =>
          state.filter((m) => m._id !== movieId)
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setSavedMoviesForRender(savedMovies);
    if (shortMoviesChexbox) {
      setSavedMoviesForRender(
        savedMoviesForRender.filter(
          (movie) => movie.duration <= SHORT_MOVIE_DURATION
        )
      );
    } else {
      setSavedMoviesForRender(savedMovies);
    }
  }, [shortMoviesChexbox]);

  return (
    <section className="saved-movies">
      <SearchForm
        shortMoviesChexbox={shortMoviesChexbox}
        setShortMoviesChexbox={setShortMoviesChexbox}
        handlerClick={handlerClick}
      />
      <MoviesCardList
        moviesArr={savedMoviesForRender}
        savedMovies={savedMovies}
        deleteMovieFromDB={deleteMovieFromDB}
      />
    </section>
  );
}

export default SavedMovies;
