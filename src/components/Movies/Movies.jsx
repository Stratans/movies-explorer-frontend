import React from "react";

import "./Movies.css";

import { moviesArray } from "../../utils/constants";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesArr={moviesArray} />
    </section>
  );
}

export default Movies;
