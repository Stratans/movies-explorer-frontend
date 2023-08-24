import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Login({ setloggedIn, onAuthorization }) {
  const navigate = useNavigate();
  const [errorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthorization(values.email, values.password);
  };

  useEffect(() => {
    if (!values.email || !values.password) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [values.email, values.password]);

  return (
    <section className="login">
      <Link to={"/"}>
        <div className="login__logo"></div>
      </Link>
      <Form
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        handleSubmit={handleSubmit}
        isValid={isValid}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
      >
        <fieldset className="form__fieldset">
          <label className="form__label">
            E-mail
            <input
              className="form__input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
              value={values.email || ""}
              pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
              autoComplete="off"
            />
            <span className="form__validation-error form__validation-error_visible email-error">
              {errors.email || ""}{" "}
            </span>
          </label>
          <label className="form__label">
            Пароль
            <input
              className="form__input form__input_error"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              minLength={8}
              maxLength={30}
              onChange={handleChange}
              value={values.password || ""}
              required
              autoComplete="off"
            />
            <span className="form__validation-error form__validation-error_visible password-error">
              {errors.password || ""}
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
