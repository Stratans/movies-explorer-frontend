import React from "react";

import { Link } from "react-router-dom";

import "./Login.css";

import Form from "../Form/Form";

function Login() {
  return (
    <section className="login">
      <Link to={"/"}>
        <div className="login__logo"></div>
      </Link>

      <Form name="login" title="Рады видеть!" buttonText="Войти">
        <fieldset className="form__fieldset">
          <label className="form__label">
            E-mail
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
            <span className="form__validation-error form__validation-error_visible email-error">
              Приехали! Почта введена некорректно
            </span>
          </label>

          <label className="form__label">
            Пароль
            <input
              className="form__input form__input_error"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength={4}
              maxLength={16}
              required
            />
            <span className="form__validation-error form__validation-error_visible password-error">
              Приехали! Пароль введен некорректно
            </span>
          </label>
        </fieldset>
      </Form>

      <span className="login__detail-text">
        Ещё не зарегистрированы?
        <Link className="login__registration-link" to={"/signup"}>
          {" "}
          Регистрация
        </Link>
      </span>
    </section>
  );
}

export default Login;
