import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-movie">
      <form className="search-form" name="search-form">
        <fieldset className="search-form__input-container">
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search-form__button"></button>
        </fieldset>

        <fieldset className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input
              type="checkbox"
              className="search-form__invisible-checkbox"
              required
            />
            <span className="search-form__visible-checkbox"></span>
            <span className="search-form__description">Короткометражки</span>
          </label>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
