import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Header.css";

import Sidebar from "../Burger/Burger";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 768) {
      setSidebarOpened(false);
    }
  }, [width]);

  return (
    <header className="header">
      <Link to={"/"}>
        <div className="header__logo"></div>
      </Link>

      {!loggedIn && (
        <div className="header__nav">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
          <Link className="header__login-button" to="/signin">
            Войти
          </Link>
        </div>
      )}

      {width > 768 && loggedIn && (
        <>
          <Navigation />
          <Link className="header__account-button" to="/profile">
            Аккаунт
          </Link>
        </>
      )}

      {width <= 768 && loggedIn && (
        <div
          className="header__burger-button"
          onClick={() => setSidebarOpened(!sidebarOpened)}
        ></div>
      )}

      {width <= 768 && (
        <Sidebar opened={sidebarOpened} setOpened={setSidebarOpened} />
      )}
    </header>
  );
}

export default Header;
