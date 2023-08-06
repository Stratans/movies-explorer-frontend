import React from "react";

import Form from "../Form/Form";

import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <Form name="profile" title={`Привет, Виталий!`} buttonText="Сохранить">
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
            />
            <span
              className="
                form__validation-error
                form__validation-error_visible
                form__validation-error_profile
                name-error"
            >
              Приехали! Некорректно введено имя
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
            />
            <span
              className="
                form__validation-error
                form__validation-error_visible
                form__validation-error_profile
                email-error"
            >
              Приехали! Некорректно введена почта
            </span>
          </label>
        </fieldset>
      </Form>
    </section>
  );
}

export default Profile;
