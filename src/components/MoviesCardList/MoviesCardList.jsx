import React from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  moviesArr,
  likeHandler,
  savedMovies,
  deleteMovieFromDB,
  moreButtonClick,
  moviesCount,
  searchedMovies,
  searchedShortMovies,
  shortMoviesChexbox,
}) {
  const moreButton = (
    <button className="movies-card-list__button" onClick={moreButtonClick}>
      Ещё
    </button>
  );

  return (
    <section className="movies-card-list">
      <div className="movies-card-list-container">
        {moviesArr &&
          moviesArr.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                likeHandler={likeHandler}
                key={movie.id || movie._id}
                savedMovies={savedMovies}
                deleteMovieFromDB={deleteMovieFromDB}
              />
            );
          })}
      </div>
      {shortMoviesChexbox
        ? moviesCount < searchedShortMovies?.length && moreButton
        : moviesCount < searchedMovies?.length && moreButton}
    </section>
  );
}

export default MoviesCardList;
