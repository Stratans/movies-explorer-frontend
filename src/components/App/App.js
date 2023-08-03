import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routesWithHeader, routesWithFooter } from "../../utils/constants";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login"

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const location = useLocation();
  const headerRoutes = routesWithHeader.find((item) => {
    return item === location.pathname
  })
  const footerRoutes = routesWithFooter.find((item) => {
    return item === location.pathname
  })
  return (
    <div className="app">
      {headerRoutes && <Header loggedIn={loggedIn} />}
      <main className="app__main">
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {footerRoutes && <Footer />}

    </div>
  );
}
export default App;