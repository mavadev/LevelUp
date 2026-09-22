import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const ITEM_WIDTH = 275;
const PADDING_OFFSET = 80;

const useDetailGame = slugGame => {
	const [game, setGame] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [slide, setSlide] = useState({ position: 0, stop: false });
	const [imgSelect, setImgSelect] = useState({ id: 0, src: '', view: false });

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${API_URL}/games/${slugGame}`)
			.then(res => {
				setGame(res.data);
			})
			.catch(error => {
				const message = error.response.data.message || error.message;
				setError(message);

				console.log(`Hubo un error al obtener el juego: ` + message);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => setGame(null);
	}, [slugGame]);

	const handleModalImage = useCallback(
		(index, src) => {
			setImgSelect(prev => ({
				id: index,
				src: src || game?.screenshots?.[index] || '',
				view: !prev.view,
			}));
		},
		[game],
	);

	const moveCarruselNext = useCallback(() => {
		const screenshots = game?.screenshots || [];
		const nextPosition = slide.position - ITEM_WIDTH;
		const itemsAdvanced = Math.floor(Math.abs(nextPosition) / ITEM_WIDTH);
		const visibleItems = Math.floor((window.innerWidth - PADDING_OFFSET) / ITEM_WIDTH);
		const isEnd = itemsAdvanced + visibleItems >= screenshots.length;

		setSlide({
			position: nextPosition,
			stop: isEnd,
		});
	}, [slide.position, game]);

	const moveCarruselPrev = useCallback(() => {
		const nextPosition = slide.position + ITEM_WIDTH;
		if (nextPosition <= 0) {
			setSlide({
				position: nextPosition,
				stop: false,
			});
		}
	}, [slide.position, loading]);

	const moveCarruselModal = useCallback(
		direction => {
			const screenshots = game?.screenshots || [];
			if (!screenshots.length) return;

			setImgSelect(prev => {
				const step = direction === 'next' ? 1 : -1;
				const total = screenshots.length;
				const newId = (prev.id + step + total) % total;

				return {
					...prev,
					id: newId,
					src: screenshots[newId],
				};
			});
		},
		[game],
	);

	return {
		game,
		slide,
		loading,
		error,
		imgSelect,
		setImgSelect,
		handleModalImage,
		moveCarruselNext,
		moveCarruselPrev,
		moveCarruselModal,
	};
};

export default useDetailGame;
