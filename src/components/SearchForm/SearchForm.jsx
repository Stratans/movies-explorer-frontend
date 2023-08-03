import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-movie">
      <form className="search-form" name="search-form" noValidate>
        <fieldset className="search-form__input-container">
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__button"></button>
        </fieldset>

        <fieldset className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input
              type="checkbox"
              className="search-form__invisible-checkbox"
              required
              minLength={2}
              maxLength={30}
            />
            <div className="search-form__visible-checkbox"></div>
            <p className="search-form__description">Короткометражки</p>
          </label>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
