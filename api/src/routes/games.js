import 'dotenv/config';
import axios from 'axios';
import { Op } from 'sequelize';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Game, Genre } from '../db.js';
const URL_BASE = `/games?key=${YOUR_API_KEY}`;

const router = Router();

router.get('/', async (req, res) => {
	const page = Number(req.query.page) || 1;
	const pageSize = 20;

	try {
		const response = await axios.get(`${URL_BASE}&page=${page}&page_size=${pageSize}`);

		const games =
			response.data.results?.map(game => {
				const { name, rating, id, background_image, genres = [] } = game;

				return {
					name,
					rating,
					id,
					background_image,
					genres: genres.map(genre => genre.name),
				};
			}) ?? [];

		return res.status(200).json(games);
	} catch (error) {
		console.error('Error getting videogames:', error);
		return res.status(500).json({
			message: 'Error al obtener los videojuegos',
		});
	}
});

router.get('/local', async (req, res) => {
	const include = {
		model: Genre,
		attributes: ['name'],
		through: { attributes: [] },
	};

	try {
		const gamesDB = await Game.findAll({ include });
		return res.status(200).json(gamesDB);
	} catch (error) {
		console.error('Error getting games:', error);
		return res.status(500).json({
			message: 'Error al obtener los videojuegos',
		});
	}
});

router.get('/search', async (req, res) => {
	const { name } = req.query;
	const countGames = 10;

	if (!name?.trim()) {
		return res.status(400).json({
			message: 'El parámetro "name" es requerido',
		});
	}

	const include = {
		model: Genre,
		attributes: ['name'],
		through: { attributes: [] },
	};

	try {
		const gamesDB = await Game.findAll({
			where: {
				name: {
					[Op.substring]: name,
				},
			},
			include,
		});

		let urlApi = `${URL_BASE}&search=${encodeURIComponent(name)}&page_size=${countGames - gamesDB.length}`;

		const response = await axios.get(urlApi);
		const gamesApi =
			response.data.results?.map(game => {
				const { name, rating, id, background_image, genres = [] } = game;

				return {
					name,
					rating,
					id,
					background_image,
					genres: genres.map(genre => genre.name),
				};
			}) ?? [];

		const games = [...gamesDB, ...gamesApi];

		return res.status(200).json(games);
	} catch (error) {
		console.error('Error searching games:', error);
		return res.status(500).json({
			message: 'Error al buscar videojuegos',
		});
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		// Petición de
		const [gameResponse, moviesResponse, screenshotsResponse] = await Promise.all([
			axios.get(`games/${id}?key=${YOUR_API_KEY}`),
			axios.get(`games/${id}/movies?key=${YOUR_API_KEY}`),
			axios.get(`games/${id}/screenshots?key=${YOUR_API_KEY}`),
		]);

		// Detalles del Juego
		const {
			name,
			description_raw,
			background_image,
			released,
			rating,
			platforms = [],
			tags = [],
			genres = [],
			website,
		} = gameResponse.data;

		// Adelanto del Juego
		const video = moviesResponse.data?.results[0] || {};

		// Imágenes del Juego (Screenshots)
		const screenshots = screenshotsResponse.data?.results?.map(screenshot => screenshot.image);

		// Envío del Juego Completo
		return res.status(200).json({
			name,
			description_raw,
			background_image,
			released,
			rating,
			platforms: platforms.map(p => p.platform.name),
			tags: tags.map(t => t.name),
			genres: genres.map(g => g.name),
			website,
			videoName: video?.name,
			videoPreview: video?.preview,
			videoData: video?.data,
			screenshots,
		});
	} catch (error) {
		console.error('Error getting videogame:', error);

		return res.status(404).json({
			message: 'No se encontró el videojuego',
			idGame: id,
		});
	}
});

router.get('/local/:id', async (req, res) => {
	const { id } = req.params;

	console.log({ id });
	if (!id.trim()) {
		return res.status(400).json({
			message: 'El parámetro "id" es requerido',
		});
	}

	try {
		// Obtener videojuego guardado en la DB
		const game = await Game.findOne({
			where: { id },
			include: {
				model: Genre,
				attributes: ['name'],
				through: { attributes: [] },
			},
		});
		return res.json(game);
	} catch (error) {
		console.log('Error getting game in DB: ', error);
		return res.status(404).json({
			message: 'No se encontró el videojuego en la DB',
			idGame: id,
		});
	}
});

router.post('/local', async (req, res) => {
	const { name, image, description, released, rating, genres, platforms, tags, website } = req.body;

	if (
		!Array.isArray(genres) ||
		genres.length === 0 ||
		!Array.isArray(platforms) ||
		platforms.length === 0 ||
		!Array.isArray(tags) ||
		tags.length === 0
	) {
		return res.status(400).json({
			message: 'genres, platforms y tags deben ser arreglos y contener al menos un elemento',
		});
	}

	try {
		// Guardamos los datos en la DB
		const newGame = await Game.create({
			name,
			background_image: image,
			description_raw: description,
			released,
			rating,
			platforms,
			tags,
			website,
		});

		// Añadimos los géneros por DB
		const genresDB = await Genre.findAll({ where: { name: genres } });
		await newGame.addGenres(genresDB);

		console.log('Juego guardado con éxito!');
		return res.status(201).json(newGame);
	} catch (error) {
		console.error('Error creating game:', error);

		return res.status(500).json({
			message: 'Error al crear el videojuego',
		});
	}
});

export default router;
