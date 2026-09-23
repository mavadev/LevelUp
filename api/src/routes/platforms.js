import 'dotenv/config';
import axios from 'axios';
import { Router } from 'express';
const { YOUR_API_KEY } = process.env;

import { Platform } from '../db.js';

const router = Router();

router.get('/', async (_, res) => {
	let dataPlatforms;
	const numPlatformsInDB = await Platform.count();

	if (numPlatformsInDB) {
		const platforms = await Platform.findAll();
		dataPlatforms = platforms;
	} else {
		const response = await axios.get(`/platforms?key=${YOUR_API_KEY}`);
		const results = response.data.results;

		// Mapear los plataformas a un objeto con solo los campos necesarios
		dataPlatforms = await Promise.all(
			results.map(async platform => {
				const [dbPlatform] = await Platform.findOrCreate({
					where: { slug: platform.slug },
					defaults: {
						id: platform.id,
						name: platform.name,
						slug: platform.slug,
						background_image: platform.image_background,
					},
				});
				return dbPlatform;
			}),
		);
	}
	return res.status(200).send(dataPlatforms);
});

export default router;
