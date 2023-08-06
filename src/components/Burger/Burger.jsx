import { Link } from "react-router-dom";
import "./Burger.css";

function Burger({ opened, setOpened }) {
  opened
    ? (document.body.style.position = "fixed")
    : (document.body.style.position = "");

  return (
    <section className={opened ? "burger active" : "burger"}>
      <div className="burger__container" />
      <nav className="burger__content">
        <div>
          <ul className="burger__items">
            <li className="burger__item">
              <Link className="burger__link" to={"/"}>
                Главная
              </Link>
            </li>
            <li className="burger__item">
              <Link className="burger__link" to={"/movies"}>
                Фильмы
              </Link>
            </li>
            <li className="burger__item">
              <Link className="burger__link" to={"/saved-movies"}>
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </div>
        <button className="burger__account-button">Аккаунт</button>
      </nav>
      <button
        className="burger__close-button"
        type="button"
        onClick={() => setOpened(!opened)}
      />
    </section>
  );
}

export default Burger;
