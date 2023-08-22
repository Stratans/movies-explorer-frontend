import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";

import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Register({ onRegister, errorMessage, setErrorMessage }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
    setErrorMessage("");
  }

  return (
    <section className="register">
      <Link to={"/"}>
        <div className="register__logo"></div>
      </Link>

      <Form
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
      >
        <fieldset className="form__fieldset">
          <label className="form__container">
            Имя
            <input
              className="form__input"
              required
              type="text"
              minLength={2}
              maxLength={30}
              placeholder="Имя"
              name="name"
              id="name"
              onChange={handleChange}
              value={values.name || ""}
            />
            <span className="form__validation-error form__validation-error_visible name-error">
              {errors.name || ""}
            </span>
          </label>

          <label className="form__container">
            E-mail
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
              value={values.email || ""}
            />
            <span className="form__validation-error form__validation-error_visible email-error">
              {errors.email || ""}
            </span>
          </label>

          <label className="form__container">
            Пароль
            <input
              className="form__input form__input_error"
              type="password"
              minLength={4}
              maxLength={8}
              name="password"
              id="password"
              placeholder="Пароль"
              required
              onChange={handleChange}
              value={values.password || ""}
            />
            <span className="form__validation-error form__validation-error_visible password-error">
              {errors.password || ""}
            </span>
          </label>
        </fieldset>
      </Form>

      <span className="register__detail-text">
        Уже зарегистрированы?
        <Link className="register__login-link" to={"/signin"}>
          {" "}
          Войти
        </Link>
      </span>
    </section>
  );
}

export default Register;
