import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({ img, name, duration }) {
  const [savedFilm, setSavedFilm] = useState(false);
  const handleSavedFilm = () => setSavedFilm(!savedFilm);

  const location = useLocation();

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
  return (
    <div className="movies-card">
      <img className="movies-card__image" alt="#" src={img}></img>
      <div className="movies-card__info">
        <h2 className="movies-card__name">{name}</h2>
        <span className="movies-card__duration">1ч 17м</span>
      </div>
      <button
        className={classMovieButton}
        type="button"
        onClick={handleSavedFilm}
      >
        {!savedFilm && "Сохранить"}
      </button>
    </div>
  );
}

export default MoviesCard;
