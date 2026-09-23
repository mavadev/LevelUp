import 'dotenv/config';
import axios from 'axios';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Tag } from '../db.js';

const router = Router();

router.get('/', async (_, res) => {
	let dataTags;
	const numTagsInDB = await Tag.count();

	if (numTagsInDB) {
		const tags = await Tag.findAll();
		dataTags = tags;
	} else {
		const response = await axios.get(`/tags?key=${YOUR_API_KEY}`);
		const results = response.data.results;

		// Mapear las etiquetas a un objeto con solo los campos necesarios
		dataTags = await Promise.all(
			results.map(async tag => {
				const [dbTag] = await Tag.findOrCreate({
					where: { slug: tag.slug },
					defaults: {
						id: tag.id,
						name: tag.name,
						slug: tag.slug,
						background_image: tag.image_background,
					},
				});
				return dbTag;
			}),
		);
	}
	return res.status(200).send(dataTags);
});

export default router;
