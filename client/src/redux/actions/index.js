import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = import.meta.env.PROD ? '#' : API_URL;

export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_TAGS = 'GET_TAGS';
export const SET_HISTORY = 'SET_HISTORY';

export const GET_GAMES_PAGE = 'GET_GAMES_PAGE';
export const FETCH_PAGE_START = 'FETCH_PAGE_START';

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

// Obtener los juegos
export const getGamesByPage =
	(page = 1) =>
	async (dispatch, getState) => {
		const GAMES_PER_PAGE = 20;
		const { gamesByPage } = getState();

		// Si ya se han obtenido los juegos de esta página, no hacer nada
		if (gamesByPage[page]) return;

		dispatch({ type: FETCH_PAGE_START });
		try {
			// Obtenemos los juegos por página
			const res = await axios.get(`/games?page=${page}&page_size=${GAMES_PER_PAGE}`);
			const totalPages = Math.ceil(res.data.count / GAMES_PER_PAGE);

			dispatch({
				type: GET_GAMES_PAGE,
				payload: {
					page: page,
					games: res.data.games,
					totalPages: totalPages,
				},
			});
		} catch (error) {
			console.error('Error al cargar la pagina: ', error);
		}
	};

// Agregar a la historia
export const setHistory = value => ({ type: SET_HISTORY, payload: value });

// Publicar un juego
export const postGame = game => async () => {
	const res = await axios.post('/games/local', game);
	return res.data;
};
