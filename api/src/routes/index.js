import axios from 'axios';
import { Router } from 'express';
axios.defaults.baseURL = 'https://api.rawg.io/api';

import genresRouter from './genres.js';
import gamesRouter from './games.js';
import platformsRouter from './platforms.js';
import tagsRouter from './tags.js';

const router = Router();

router.get('/', (_, res) => res.send('Welcome to Api for PI-Videogames.'));
router.use('/genres', genresRouter);
router.use('/games', gamesRouter);
router.use('/platforms', platformsRouter);
router.use('/tags', tagsRouter);

router.use((req, res) => {
	res.status(404).send('ERROR 404: Ruta no encontrada.');
});

export default router;
