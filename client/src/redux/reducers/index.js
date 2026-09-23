import {
	GET_TAGS,
	GET_GENRES,
	GET_PLATFORMS,
	GET_FEATURED_GAMES,
	GET_FILTERED_GAMES,
	SET_HISTORY,
	SET_DROPDOWN,
	SET_LOADING_GAMES,
} from '../actions';

const initialState = {
	genres: [],
	platforms: [],
	tags: [],
	history: [],

	featuredGames: [],
	filteredGames: {},
	loadingGames: false,
	dropdownState: {
		genres: true,
		platforms: false,
		tags: false,
		order: false,
		creator: false,
	},
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

		case GET_FEATURED_GAMES:
			return { ...state, featuredGames: payload };

		case GET_FILTERED_GAMES:
			return {
				...state,
				filteredGames: {
					games: payload.games,
					totalGames: payload.totalGames,
					totalPages: payload.totalPages,
				},
				loadingGames: false,
			};

		case SET_DROPDOWN: {
			return { ...state, dropdownState: payload };
		}

		case SET_HISTORY: {
			const filteredHistory = state.history.filter(item => item !== payload);
			return { ...state, history: [payload, ...filteredHistory] };
		}

		default:
			return { ...state };
	}
};
