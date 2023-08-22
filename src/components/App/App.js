import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { routesWithHeader, routesWithFooter } from "../../utils/constants";
import { registration, authorization, checkToken, getUserInfo, updateProfile, getSavedMovies } from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute"

function App() {
  const location = useLocation();
  const headerRoutes = routesWithHeader.find((item) => {
    return item === location.pathname
  })
  const footerRoutes = routesWithFooter.find((item) => {
    return item === location.pathname
  })
  const navigate = useNavigate()
  const [loggedIn, setloggedIn] = useState(false); // стейт пользователя — вошёл он в систему или нет
  const [currentUser, setCurrentUser] = useState({}) // стейт данных пользователя
  const [errorMessage, setErrorMessage] = useState(''); // стейт ошибок
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохраненных фильмов

  // регистрация пользователя
  // function handleRegister(name, email, password) {
  //   setErrorMessage("")
  //   registration(name, email, password)
  //     .then(() => {
  //       authorization(email, password)
  //     })
  //     .catch(err => {
  //       if (err.includes(409)) {
  //         setErrorMessage("Пользователь с таким email уже существует");
  //       } else {
  //         setErrorMessage("При регистрации пользователя произошла ошибка");
  //       }
  //     })
  // }

  // регистрация пользователя async
  const handleRegister = async (name, email, password) => {
    try {
      setErrorMessage("")
      await registration(name, email, password)
      await authorization(email, password)
    } catch (err) {
      if (err.includes(409)) {
        setErrorMessage("Пользователь с таким email уже существует");
      } else {
        setErrorMessage("При регистрации пользователя произошла ошибка");
      }
    }
  }

  // авторизация пользователя
  // function handleAuthorization(email, password) {
  //   authorization(email, password)
  //     .then(data => {
  //       setloggedIn(true)
  //       localStorage.setItem("token", data.token)
  //       navigate("/movies")
  //     })
  //     .catch(err => console.log(err))
  // }

  // авторизация пользователя async
  const handleAuthorization = async (email, password) => {
    try {
      const data = await authorization(email, password)
      localStorage.setItem("token", data.token)
      setloggedIn(true)
      navigate("/movies")
    } catch (err) {
      console.log(err)
    }
  }

  // обновление данных пользователя
  // function handleUpdateUser({ email, name }) {
  //   updateProfile({ email, name })
  //     .then(data => {
  //       setCurrentUser(data)
  //       setErrorMessage("Данные пользователя обновлены")
  //       setTimeout(() => {
  //         setErrorMessage("")
  //       }, 5000)
  //     })
  //     .catch(err => {
  //       setErrorMessage("При обновлении пользователя произошла ошибка.");
  //     })
  // }

  // обновление данных пользователя async
  const handleUpdateUser = async ({ email, name }) => {
    try {
      const data = await updateProfile({ email, name })
      setCurrentUser(data)
      setErrorMessage("Данные пользователя обновлены")
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    } catch (err) {
      setErrorMessage("При обновлении пользователя произошла ошибка.");
    }
  }

  // логин
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setloggedIn(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  // сохраняем контекст пользователя
  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch(err => { console.log(err) })
    }
  }, [loggedIn]);

  // разлогин
  function logout() {
    localStorage.removeItem("allDownloadedMovies")
    localStorage.removeItem("allData")
    localStorage.removeItem("token")
    setloggedIn(false)
    navigate("/")
    setCurrentUser({ email: "", name: "" })
  }

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies().then((movies) => {
        const ownMovies = movies.filter(movie => movie.owner._id = currentUser.userId)
        setSavedMovies(ownMovies)
      })
    }
  }, [currentUser.userId, setSavedMovies]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies().then((movies) => {
        const ownMovies = movies.filter(movie => movie.owner._id = currentUser.userId)
        setSavedMovies(ownMovies)
      })
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/movies")
      } else { navigate(location.pathname) }
    }
  }, [loggedIn, location.pathname])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">
        {headerRoutes && <Header loggedIn={loggedIn} />}
        <main className="app__main">

          <Routes>
            <Route path="/movies" element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies} />
            } />
            <Route path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  onUpdateUser={handleUpdateUser}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  logout={logout}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={<Register
                onRegister={handleRegister}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage} />} />
            <Route
              path="/signin"
              element={<Login
                setloggedIn={setloggedIn}
                onAuthorization={handleAuthorization} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {footerRoutes && <Footer />}

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;