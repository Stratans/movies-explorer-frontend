import React from "react";

import { Link } from "react-router-dom";

import "./Register.css";

import Form from "../Form/Form";

function Register() {
  return (
    <section className="register">
      <Link to={"/"}>
        <div className="register__logo"></div>
      </Link>

      <Form
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
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
            />
            <span className="form__validation-error form__validation-error_visible name-error">
              Приехали! Вы ввели некорректное имя
            </span>
          </label>

          <label className="form__container">
            E-mail
            <input
              className="form__input"
              required
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <span className="form__validation-error form__validation-error_visible email-error">
              Приехали! Вы ввели некорректную почту
            </span>
          </label>

          <label className="form__container">
            Пароль
            <input
              className="form__input form__input_error"
              required
              type="password"
              minLength={4}
              maxLength={8}
              name="password"
              placeholder="Пароль"
            />
            <span className="form__validation-error form__validation-error_visible password-error">
              Приехали! Вы ввели некорректный пароль
            </span>
          </label>
        </fieldset>
      </Form>

      <span className="register__alternate-text">
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
