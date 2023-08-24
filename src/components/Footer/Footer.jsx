import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__element">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__date">&copy; {year}</p>
        <ul className="footer__links-container">
          <li className="footer-link-container">
            <Link
              className="footer__link"
              to="https://practicum.yandex.ru"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer-link-container">
            <Link
              className="footer__link"
              to="https://github.com/stratans"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
