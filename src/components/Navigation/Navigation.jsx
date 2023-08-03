import React from "react";

import { Link } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__element">
        <li className="navigation__element-item">
          <Link className="navigation__link" to={"/movies"}>
            Фильмы
          </Link>
        </li>
        <li>
          <Link className="navigation__link" to={"/saved-movies"}>
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
