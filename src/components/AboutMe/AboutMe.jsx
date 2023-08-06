import React from "react";

import { Link } from "react-router-dom";

import "./AboutMe.css";

import photo from "../../images/vitaliy-photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__student-container">
        <div className="about-me__student">
          <div className="about-me__about-container">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__job">
              Фронтенд-разработчик, 30&nbsp;лет
            </p>
            <p className="about-me__description">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
              экономики СГУ. У меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
              музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке, начал
              заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
          </div>
          <Link
            className="about-me__link"
            to="https://github.com/stratans"
            target="blank"
          >
            Github
          </Link>
        </div>
        <img
          className="about-me__picture"
          src={photo}
          alt="Фото студента"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
