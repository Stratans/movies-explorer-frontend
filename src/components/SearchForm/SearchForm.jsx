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

  const [isDisabled, setIsDisabled] = useState(true);

  function onSubmit(evt) {
    evt.preventDefault();
    handlerClick(shortMoviesChexbox, values.search);
  }

  const handlerClickCheckbox = () => {
    setShortMoviesChexbox(!shortMoviesChexbox);
  };

  useEffect(() => {
    if (values.search === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [values.search]);

  useEffect(() => {
    setIsDisabled(true);
  }, []);

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
          <button
            type="submit"
            className="search-form__button"
            disabled={isDisabled}
          ></button>
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
