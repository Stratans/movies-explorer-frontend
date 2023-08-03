import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="aboutProject">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info-container">
        <div className="about-project__element">
          <h3 className="about-project__element-title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__element-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__element">
          <p className="about-project__element-title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </p>
          <p className="about-project__element-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__timeline-container">
        <p className="about-project__timeline">1 неделя</p>
        <p className="about-project__timeline">4 недели</p>
        <p className="about-project__timeline">Back-end</p>
        <p className="about-project__timeline">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
