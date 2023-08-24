import React, { useEffect, useState } from "react";

import "./SearchForm.css";

import useFormAndValidation from "../../hooks/useFormAndValidation";

function SearchForm({
  handlerClick,
  shortMoviesChexbox,
  setShortMoviesChexbox,
  previousFilter,
}) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const [filterError, setFilterError] = useState("");

  function onSubmit(evt) {
    evt.preventDefault();
    if (values.search === undefined || values.search === "") {
      setFilterError("Нужно ввести ключевое слово");
      return;
    } else {
      handlerClick(shortMoviesChexbox, values.search);
    }
    setFilterError("");
  }

  const handlerClickCheckbox = () => {
    setShortMoviesChexbox(!shortMoviesChexbox);
  };

  useEffect(() => {
    if (previousFilter) {
      setValues({ ...values, search: previousFilter });
    }
  }, [previousFilter, setValues]);

  return (
    <section className="search-movie">
      <form className="search-form" name="search-form" onSubmit={onSubmit}>
        <fieldset className="search-form__input-container">
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильм"
            name="search"
            value={values.search || ""}
            onChange={handleChange}
          />
          <button type="submit" className="search-form__button"></button>
          <span className="form__validation-error form__validation-error_visible email-error">
            {filterError}
          </span>
        </fieldset>

        <fieldset className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input
              type="checkbox"
              className="search-form__invisible-checkbox"
              onChange={handlerClickCheckbox}
              checked={shortMoviesChexbox}
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
