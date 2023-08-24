import React from "react";

import { Link } from "react-router-dom";

import "./Form.css";

function Form({
  name,
  title,
  children,
  buttonText,
  handleSubmit,
  editMode,
  setEditMode,
  errorMessage,
  isValid,
  disabledButton,
  logout,
  isDisabled,
}) {
  const login = name === "login";
  const profile = name === "profile";
  return (
    <form className={`form form-${name}`} onSubmit={handleSubmit}>
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
            {errorMessage}
          </span>
          <button
            className="form__button-submit"
            type="submit"
            disabled={!isValid || isDisabled}
          >
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
            <Link className="profile__button-exit" onClick={logout}>
              Выйти из аккаунта
            </Link>
          </div>
        ) : (
          <div className="profile__button-save-container">
            <span className="form__errortext form__errortext_visible">
              {errorMessage}
            </span>
            <button
              className="form__button-submit"
              type="submit"
              disabled={!isValid || disabledButton}
            >
              Сохранить
            </button>
          </div>
        ))}
    </form>
  );
}
export default Form;
