import 'dotenv/config';
import axios from 'axios';
import { Op } from 'sequelize';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Videogame, Genre } from '../db.js';
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
		const gamesDB = await Videogame.findAll({ include });
		return res.status(200).json(gamesDB);
	} catch (error) {
		console.error('Error getting videogames:', error);
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
		const gamesDB = await Videogame.findAll({
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
		console.error('Error searching videogames:', error);
		return res.status(500).json({
			message: 'Error al buscar videojuegos',
		});
	}
});

export default router;
