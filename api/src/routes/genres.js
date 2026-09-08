import 'dotenv/config';
import axios from 'axios';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Genre } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
	let dataGenres;
	const numGenresInDB = await Genre.count();

	if (numGenresInDB) {
		const genres = await Genre.findAll();
		dataGenres = genres;
	} else {
		const response = await axios.get(`/genres?key=${YOUR_API_KEY}`);

		const results = response.data.results;
		results.forEach(g => Genre.create({ name: g.name }));

		dataGenres = results;
	}
	return res.send(dataGenres.map(e => e.name));
});

export default router;
