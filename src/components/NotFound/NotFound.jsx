import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>

      <Link className="not-found__link" onClick={goBack}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
