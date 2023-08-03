import React from "react";

import { savedMoviesArray } from "../../utils/constants";

import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList moviesArr={savedMoviesArray} />
    </section>
  );
}

export default SavedMovies;
