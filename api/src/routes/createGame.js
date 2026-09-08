import { Router } from 'express';
import { Videogame, Genre } from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
	const { name, image, description, released, rating, genres, platforms, tags, website } = req.body;

	// Pasar a arreglo si se envia un string
	const validateArray = element => (!Array.isArray(element) ? [element] : element);

	try {
		const newGame = await Videogame.create({
			name,
			background_image: image,
			description_raw: description,
			released,
			rating,
			platforms: validateArray(platforms),
			tags: validateArray(tags),
			website,
		});

		genres.forEach(async genre => {
			const genreDB = await Genre.findAll({ where: { name: genre } });
			newGame.addGenre(genreDB);
		});

		console.log('Juego publicado con éxito!');
		return res.json(newGame);
	} catch (err) {
		console.log('Error: ', err);
		return res.json('Hubo un error al tratar de crear el juego: ', err);
	}
});

export default router;
