import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ movie, likeHandler, savedMovies, deleteMovieFromDB }) {
  const [savedFilm, setSavedFilm] = useState(false);

  const location = useLocation();

  const durationInHoursAndMinutes = `${Math.trunc(movie.duration / 60)}ч ${
    movie.duration % 60
  }м`;

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setSavedFilm(true);
    }
  }, [location.pathname]);

  const classMovieButton = `${
    savedFilm && location.pathname === "/movies"
      ? "movies-card__button movies-card__button_saved"
      : "movies-card__button"
  }
    ${
      savedFilm &&
      location.pathname === "/saved-movies" &&
      "movies-card__button_delete"
    }
    ${
      !savedFilm &&
      location.pathname === "/saved-movies" &&
      "movies-card__button_hidden"
    }
    `;

  const onClickLikeHandler = () => {
    const dataMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: "https://api.nomoreparties.co" + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: "https://api.nomoreparties.co" + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    likeHandler(dataMovie, setSavedFilm);
  };

  const handleDeleteMovie = () => {
    deleteMovieFromDB(movie._id || movie.id, setSavedFilm);
  };

  useEffect(() => {
    const saved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    if (saved) {
      setSavedFilm(true);
    }
  }, [savedMovies, movie.id]);

  return (
    <div className="movies-card">
      <Link
        className="movies-card__link"
        to={`${movie.trailerLink}`}
        target="blank"
      >
        <img
          className="movies-card__image"
          alt="#"
          src={
            location.pathname === "/saved-movies"
              ? movie.image
              : "https://api.nomoreparties.co" + movie.image.url
          }
        ></img>
      </Link>
      <div className="movies-card__info">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <span className="movies-card__duration">
          {durationInHoursAndMinutes}
        </span>
      </div>
      <button
        className={classMovieButton}
        type="button"
        onClick={
          location.pathname === "/saved-movies"
            ? handleDeleteMovie
            : savedFilm
            ? handleDeleteMovie
            : onClickLikeHandler
        }
      >
        {!savedFilm && "Сохранить"}
      </button>
    </div>
  );
}

export default MoviesCard;
