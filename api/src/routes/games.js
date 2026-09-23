import 'dotenv/config';
import axios from 'axios';
import { Op, where } from 'sequelize';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Game, Genre, Platform, Tag } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
	const page = Number(req.query.page || 1);
	const limit = Number(req.query.limit || 20);
	const { search, genres, platforms, tags, sort, creator } = req.query;

	// Juegos de la Comunidad
	if (creator === 'community') {
		// Sanitization de filtros comma-separated a arrays
		const genresList = genres ? genres.split(',').filter(Boolean) : [];
		const platformsList = platforms ? platforms.split(',').filter(Boolean) : [];
		const tagsList = tags ? tags.split(',').filter(Boolean) : [];

		try {
			// Definir la búsqueda por nombre
			const whereConditions = {};
			if (search) whereConditions.name = { [Op.iLike]: `%${search.trim()}%` };

			// Definir el ordenamiento según el parámetro sort
			let order = [];
			if (sort === 'name') order = [['name', 'ASC']];
			else if (sort === '-name') order = [['name', 'DESC']];
			else if (sort === 'rating') order = [['rating', 'ASC']];
			else if (sort === '-rating') order = [['rating', 'DESC']];

			// Incluir las relaciones para los géneros y plataformas
			const includeConditions = [
				{
					model: Genre,
					attributes: ['name'],
					through: { attributes: [] },
					where: genresList.length ? { id: { [Op.in]: genresList } } : undefined,
				},
				{
					model: Platform,
					attributes: ['name'],
					through: { attributes: [] },
					where: platformsList.length ? { id: { [Op.in]: platformsList } } : undefined,
				},
				{
					model: Tag,
					attributes: ['name'],
					through: { attributes: [] },
					where: tagsList.length ? { id: { [Op.in]: tagsList } } : undefined,
				},
			];

			// Consulta a la DB con los filtrados
			const { count: totalGamesDB, rows: gamesDB } = await Game.findAndCountAll({
				where: whereConditions,
				include: includeConditions,
				order: order.length ? order : [['id', 'ASC']],
				limit: limit,
				offset: (page - 1) * limit,
				distinct: true,
			});
			const totalPagesDB = Math.ceil(totalGamesDB / limit);

			return res.status(200).json({
				games: gamesDB,
				totalGames: totalGamesDB,
				totalPages: totalPagesDB,
			});
		} catch (error) {
			console.error('Error getting games in DB:', error);
			return res.status(404).json({
				message: 'Error al obtener los videojuegos en la DB',
			});
		}
	}

	try {
		// Obtención de parámetros válidos
		const params = {};
		Object.entries({ search, genres, platforms, tags, sort }).forEach(([key, value]) => {
			if (!value || !value.trim()) return;
			params[key] = value;
		});

		// Solicitud a la API con los filtros
		const { data } = await axios.get('/games', {
			params: {
				key: YOUR_API_KEY,
				page,
				page_size: limit,
				...params,
			},
		});

		// Transformación de los datos de la API
		const gamesAPI =
			data.results?.map(game => {
				const { slug, name, rating, id, background_image, genres: gameGenres = [] } = game;
				return {
					id,
					slug,
					name,
					rating,
					background_image,
					genres: gameGenres?.map(genre => ({ name: genre.name })),
				};
			}) ?? [];

		// Obtención de los datos totales
		const totalGamesDB = data.count;
		const totalPagesDB = Math.ceil(totalGamesDB / limit);

		return res.status(200).json({
			games: gamesAPI,
			totalGames: totalGamesDB,
			totalPages: totalPagesDB,
		});
	} catch (error) {
		console.error('Error getting videogames:', error);
		return res.status(404).json({
			message: 'Error al obtener los videojuegos',
		});
	}
});

router.get('/:slug', async (req, res) => {
	const slug = req.params.slug.trim();

	try {
		// Buscamos en la DB
		const gameInDB = await Game.findOne({
			where: { slug },
			include: [
				{
					model: Genre,
					attributes: ['name'],
					through: { attributes: [] },
				},
				{
					model: Platform,
					attributes: ['name'],
					through: { attributes: [] },
				},
				{
					model: Tag,
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		});

		if (gameInDB) {
			const gameFormatted = {
				...gameInDB.toJSON(),
				genres: gameInDB.genres.map(g => g.name),
				platforms: gameInDB.platforms.map(p => p.name),
				tags: gameInDB.tags.map(t => t.name),
			};
			return res.status(200).json(gameFormatted);
		}

		// Petición de los detalles del juego en la API externa
		const [gameResponse, moviesResponse, screenshotsResponse] = await Promise.all([
			axios.get(`games/${slug}?key=${YOUR_API_KEY}`),
			axios.get(`games/${slug}/movies?key=${YOUR_API_KEY}`),
			axios.get(`games/${slug}/screenshots?key=${YOUR_API_KEY}`),
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
			description: description_raw,
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
			slugGame: slug,
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

		const response = await axios.get('/games', {
			params: {
				key: YOUR_API_KEY,
				search: encodeURIComponent(name),
				page_size: countGames - gamesDB.length,
			},
		});
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

router.post('/local', async (req, res) => {
	const { name, image, description, released, rating, website, genres = [], platforms = [], tags = [] } = req.body;

	if (genres.length === 0 || platforms.length === 0 || tags.length === 0) {
		return res.status(400).json({
			message: 'genres, platforms y tags deben contener al menos un elemento',
		});
	}

	try {
		// Creación de un slug random para el juego basado en el título y num random
		const randomNum = Math.floor(1000 + Math.random() * 9000);
		const slug = name
			.toLowerCase()
			.trim()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9 -]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.concat(`-${randomNum}`);

		// Guardamos los datos en la DB
		const newGame = await Game.create({
			slug,
			name,
			background_image: image,
			description,
			released,
			rating,
			website,
		});

		// Añadimos los géneros por DB
		const genresDB = await Genre.findAll({ where: { id: { [Op.in]: genres } } });
		await newGame.addGenres(genresDB);

		// Añadimos las plataformas por DB
		const platformsDB = await Platform.findAll({ where: { id: { [Op.in]: platforms } } });
		await newGame.addPlatforms(platformsDB);

		// Añadimos las plataformas por DB
		const tagsDB = await Tag.findAll({ where: { id: { [Op.in]: tags } } });
		await newGame.addTags(tagsDB);

		return res.status(201).json(newGame);
	} catch (error) {
		console.error('Error creating game:', error);

		return res.status(500).json({
			message: 'Error al crear el videojuego',
		});
	}
});

export default router;
