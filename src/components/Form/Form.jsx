import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import "./Form.css";

const formSubmitError = "Произошла ошибка";

function Form({ name, title, children, buttonText }) {
  const login = name === "login";
  const profile = name === "profile";
  const [editMode, setEditMode] = useState(false);

  return (
    <form className={`form form-${name}`}>
      <h1 className={`form__header ${profile && "form__header_profile"}`}>
        {title}
      </h1>
      {children}
      {(name === "login" || name === "register") && (
        <div
          className={`form__button-container ${
            login && "form__button-container_login"
          }`}
        >
          <span className="form__errortext form__errortext_visible">
            {formSubmitError}
          </span>
          <button className="form__button-submit" type="submit">
            {buttonText}
          </button>
        </div>
      )}

      {profile &&
        (!editMode ? (
          <div
            className={`form__button-container ${
              profile && "form__button-container_profile"
            }`}
          >
            <button
              type="button"
              className="profile__button-edit"
              onClick={() => setEditMode(true)}
            >
              Редактировать
            </button>
            <Link className="profile__button-exit" to={"/"}>
              Выйти из аккаунта
            </Link>
          </div>
        ) : (
          <div className="profile__button-save-container">
            <span className="form__errortext form__errortext_visible">
              При обновлении профиля произошла ошибка
            </span>
            <button
              className="form__button-submit"
              type="submit"
              onClick={() => setEditMode(false)}
            >
              Сохранить
            </button>
          </div>
        ))}
    </form>
  );
}
export default Form;
