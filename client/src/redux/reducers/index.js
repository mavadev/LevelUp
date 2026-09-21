import { GET_TAGS, GET_GENRES, GET_PLATFORMS, GET_GAMES_PAGE, SET_HISTORY, FETCH_PAGE_START } from '../actions';

const initialState = {
	genres: [],
	platforms: [],
	tags: [],
	history: [],

	gamesByPage: {},
	loadingPage: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_GENRES:
			return { ...state, genres: payload };

		case GET_PLATFORMS:
			return { ...state, platforms: payload };

		case GET_TAGS:
			return { ...state, tags: payload };

		case FETCH_PAGE_START:
			return { ...state, loadingPage: true };

		case GET_GAMES_PAGE:
			return {
				...state,
				gamesByPage: {
					...state.gamesByPage,
					[payload.page]: payload.games,
				},
				loadingPage: false,
			};

		case SET_HISTORY: {
			const filteredHistory = state.history.filter(item => item !== payload);
			return { ...state, history: [payload, ...filteredHistory] };
		}

		default:
			return { ...state };
	}
};
