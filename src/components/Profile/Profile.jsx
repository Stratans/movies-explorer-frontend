import React, { useContext } from "react";

import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import "./Profile.css";

import Form from "../Form/Form";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Profile({
  setloggedIn,
  onUpdateUser,
  errorMessage,
  setErrorMessage,
  logout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [disabledButton, setDisabledButton] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      email: values.email,
      name: values.name,
    });
  };

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues]);

  useEffect(() => {
    if (errorMessage) {
      setEditMode(true);
    } else setEditMode(false);
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  useEffect(() => {
    currentUser.name === values.name && currentUser.email === values.email
      ? setDisabledButton(true)
      : setDisabledButton(false);
  }, [values.name, values.email]);

  return (
    <section className="profile">
      <Form
        name="profile"
        title={`Привет, ${currentUser.name}!`}
        buttonText="Сохранить"
        isValid={isValid}
        handleSubmit={handleSubmit}
        editMode={editMode}
        setEditMode={setEditMode}
        errorMessage={errorMessage}
        disabledButton={disabledButton}
        logout={logout}
      >
        <fieldset className="form__fieldset form__fieldset_profile">
          <label className="form__label-profile">
            Имя
            <input
              className="form__input form__input_profile"
              type="text"
              minLength={2}
              maxLength={30}
              placeholder="Имя"
              name="name"
              required
              onChange={handleChange}
              value={values.name || ""}
              disabled={!editMode}
            />
            <span
              className="
                form__validation-error
                form__validation-error_visible
                form__validation-error_profile
                name-error"
            >
              {errors.name || ""}
            </span>
          </label>

          <div className="form__divider"></div>

          <label className="form__label-profile">
            E-mail
            <input
              className="form__input form__input_profile"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
              value={values.email || ""}
              disabled={!editMode}
            />
            <span
              className="
                form__validation-error
                form__validation-error_visible
                form__validation-error_profile
                email-error"
            >
              {errors.email || ""}
            </span>
          </label>
        </fieldset>
      </Form>
    </section>
  );
}

export default Profile;
