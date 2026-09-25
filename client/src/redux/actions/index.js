import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'https://levelup-backend-jfkp.onrender.com/api';
axios.defaults.baseURL = API_URL;

export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_TAGS = 'GET_TAGS';
export const SET_DROPDOWN = 'SET_DROPDOWN';

export const GET_FEATURED_GAMES = 'GET_FEATURED_GAMES';
export const GET_FILTERED_GAMES = 'GET_FILTERED_GAMES';
export const SET_LOADING_GAMES = 'SET_LOADING_GAMES';

// Obtener los géneros
export const getGenres = () => async dispatch => {
	const res = await axios.get('/genres');
	return dispatch({ type: GET_GENRES, payload: res.data });
};

// Obtener las plataformas
export const getPlatforms = () => async dispatch => {
	const res = await axios.get('/platforms');
	return dispatch({ type: GET_PLATFORMS, payload: res.data });
};

// Obtener las etiquetas
export const getTags = () => async dispatch => {
	const res = await axios.get('/tags');
	return dispatch({ type: GET_TAGS, payload: res.data });
};

// Obtener juegos destacados (landing)
export const getFeaturedGames =
	(limit = 10) =>
	async dispatch => {
		try {
			const { data } = await axios.get(`/games?limit=${limit}&sort=-rating`);
			dispatch({ type: GET_FEATURED_GAMES, payload: data.games });
		} catch (error) {
			console.error('Error fetching featured games:', error);
		}
	};

// Obtener los juegos filtrados
export const getFilteredGames =
	(params = {}) =>
	async dispatch => {
		// Seteamos el estado de carga en true
		dispatch({ type: SET_LOADING_GAMES, payload: true });

		try {
			// Convertimos el objeto de params a un query string
			const queryParams = new URLSearchParams(params).toString();
			const response = await axios.get(`/games?${queryParams}`);
			const data = await response.data;

			dispatch({
				type: GET_FILTERED_GAMES,
				payload: {
					games: data.games,
					totalGames: data.totalGames,
					totalPages: data.totalPages,
				},
			});
		} catch (error) {
			throw new Error('Error al cargar la pagina: ' + error.message);
		} finally {
			// Seteamos el estado de carga en false
			dispatch({ type: SET_LOADING_GAMES, payload: false });
		}
	};

export const setOpenDropdowns = dropdown => ({ type: SET_DROPDOWN, payload: dropdown });

// Publicar un juego
export const postGame = game => {
	return axios.post('/games/local', game);
};
