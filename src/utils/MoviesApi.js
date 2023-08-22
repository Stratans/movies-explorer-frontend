import { MOVIES_URL } from "./constants";

function checkResponse(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка: ${res.status}`);
	}
	return res.json();
};

export const getMovies = () => {
	return (
		fetch(`${MOVIES_URL}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => checkResponse(res))
	)
		.catch(err => console.log(err))
};