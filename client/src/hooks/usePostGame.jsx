import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { postGame } from '../redux/actions';
import { validate } from '../containers/post-game/validate';

const initialState = {
	name: '',
	image: '',
	description: '',
	released: '',
	rating: '',
	website: '',
	genres: [],
	platforms: [],
	tags: [],
};

const usePostGame = () => {
	const navigate = useNavigate();
	const [game, setGame] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [errorImage, setErrorImage] = useState(false);

	const handleRatingChange = newValue => {
		setGame({ ...game, rating: Number(newValue) || 0 });
	};

	const handleInputChange = e => {
		const { name, value, checked } = e.target;

		// Guardar las categorías seleccionadas
		if (['genres', 'platforms', 'tags'].includes(name)) {
			setGame(prev => ({
				...prev,
				[name]: checked ? [...prev[name], value] : prev[name].filter(v => v !== value),
			}));
			return;
		}

		if (name === 'rating') {
			setGame(prev => ({ ...prev, rating: Number(value) }));
			return;
		}

		setGame(prev => ({ ...prev, [name]: value }));
	};

	const handleResetForm = () => {
		setErrors({});
		setGame(initialState);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);

		// Comprueba si no hay ningún mensaje de error en el objeto
		const validationErrors = validate(game);
		const hasErrors = Object.values(validationErrors).some(err => Boolean(err && err.length > 0));

		// Si hay errores se muestra y no se envía nada
		if (hasErrors) {
			setErrors(validationErrors);
			setIsLoading(false);
			return;
		}

		// Caso todo bien, se envía la petición del juego
		setErrors({});
		try {
			const response = await postGame(game);
			const createdSlug = response?.data?.slug || response?.slug || '';

			setGame(initialState);
			// Redirection a ver el juego creado
			if (createdSlug) {
				navigate(`/games/${createdSlug}`);
				toast.success('¡Juego publicado con éxito!');
			}
		} catch (err) {
			const message = err.results?.data?.message || err.message;
			setErrors({ system: message });
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		game,
		errors,
		isLoading,
		errorImage,
		handleInputChange,
		handleRatingChange,
		handleResetForm,
		handleSubmit,
	};
};

export default usePostGame;
