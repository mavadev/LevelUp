import { GET_TAGS, GET_GENRES, GET_PLATFORMS, GET_GAMES, SET_HISTORY, SET_LOADING_GAMES } from '../actions';

const initialState = {
	genres: [],
	platforms: [],
	tags: [],
	history: [],

	filteredGames: [],
	loadingGames: false,
	totalGames: 0,
	totalPages: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_GENRES:
			return { ...state, genres: payload };

		case GET_PLATFORMS:
			return { ...state, platforms: payload };

		case GET_TAGS:
			return { ...state, tags: payload };

		case SET_LOADING_GAMES:
			return { ...state, loadingGames: payload };

		case GET_GAMES:
			console.log({ payload });
			return {
				...state,
				filteredGames: payload.games,
				totalGames: payload.totalGames,
				totalPages: payload.totalPages,
			};

		case SET_HISTORY: {
			const filteredHistory = state.history.filter(item => item !== payload);
			return { ...state, history: [payload, ...filteredHistory] };
		}

		default:
			return { ...state };
	}
};
