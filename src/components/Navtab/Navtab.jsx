import React from "react";

import "./Navtab.css";

function Navtab() {
  return (
    <nav className="navtab">
      <ul className="navtab__element">
        <li className="navtab__element-item">
          <a className="navtab__link" href="#aboutProject">
            О проекте
          </a>
        </li>
        <li className="navtab__element-item">
          <a className="navtab__link" href="#technologies">
            Технологии
          </a>
        </li>
        <li className="navtab__element-item">
          <a className="navtab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navtab;
