import React from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesArr }) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list-container">
        {moviesArr.map((movie) => {
          return (
            <MoviesCard
              img={movie.img}
              name={movie.name}
              duration={movie.duration}
            />
          );
        })}
      </div>
      <button className="movies-card-list__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
