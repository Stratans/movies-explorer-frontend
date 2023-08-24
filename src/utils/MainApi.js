import { BASE_URL } from "./constants";

function checkResponse(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
};

export const registration = (name, email, password) => {
	return (
		fetch(`${BASE_URL}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
		}).then((res) => checkResponse(res))
	)
};

export const authorization = (email, password) => {
	return (
		fetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		}).then((res) => checkResponse(res))
	)
};

// проверяем токен 
export const checkToken = (token) => {
	return (
		fetch(`${BASE_URL}/users/me`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
		}).then((res) => checkResponse(res))
	)
};

// информация о пользователе с сервера
export const getUserInfo = () => {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/users/me`, {
		headers: {
			method: 'GET',
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}).then((res) => checkResponse(res))
};

// обновление данных профиля
export const updateProfile = ({ email, name }) => {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, name })
	}).then((res) => checkResponse(res))
};

// сохраняем фильм
export const saveMovie = (movie) => {
	const token = localStorage.getItem('token')
	return (
		fetch(`${BASE_URL}/movies`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...movie })
		}).then((res) => checkResponse(res))
	)
};

// удаляем фильм
export const deleteMovie = (movieId) => {
	const token = localStorage.getItem('token')
	return (
		fetch(`${BASE_URL}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => checkResponse(res))
	)
};

// получем сохраненные фильмы
export const getSavedMovies = () => {
	const token = localStorage.getItem('token')
	return fetch(`${BASE_URL}/movies`, {
		headers: {
			method: 'GET',
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}).then((res) => checkResponse(res))
};
