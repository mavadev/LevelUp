import axios from 'axios';
import { Router } from 'express';
axios.defaults.baseURL = 'https://api.rawg.io/api';

import genresRouter from './genres.js';
import gamesRouter from './games.js';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to Api for PI-Videogames.'));
router.use('/genres', genresRouter);
router.use('/games', gamesRouter);

router.use((req, res) => {
	res.status(404).send('ERROR 404: Ruta no encontrada.');
});

export default router;
