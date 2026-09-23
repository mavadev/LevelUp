import 'dotenv/config';
import axios from 'axios';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Genre } from '../db.js';
const router = Router();

router.get('/', async (_, res) => {
	let dataGenres;
	const numGenresInDB = await Genre.count();

	if (numGenresInDB) {
		const genres = await Genre.findAll();
		dataGenres = genres;
	} else {
		const response = await axios.get(`/genres?key=${YOUR_API_KEY}`);
		const results = response.data.results;

		// Crear o actualizar los géneros en la BD
		dataGenres = await Promise.all(
			results.map(async genre => {
				const [dbGenre] = await Genre.findOrCreate({
					where: { slug: genre.slug },
					defaults: {
						id: genre.id,
						name: genre.name,
						slug: genre.slug,
						background_image: genre.image_background,
					},
				});
				return dbGenre;
			}),
		);
	}
	return res.status(200).send(dataGenres);
});

export default router;
