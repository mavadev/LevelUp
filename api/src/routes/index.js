import axios from 'axios';
import { Router } from 'express';
axios.defaults.baseURL = 'https://api.rawg.io/api';

import rutaGeneros from './genres.js';
import rutaJuego from './videogame.js';
import rutaJuegos from './videogames.js';
import rutaCreacion from './createGame.js';

const router = Router();

router.get('/', (req, res) => res.send('Welcome to Api for PI-Videogames.'));
router.use('/genres', rutaGeneros);
router.use('/videogames', rutaJuegos);
router.use('/videogame', rutaJuego);
router.use('/videogame', rutaCreacion);

router.use((req, res) => {
	res.status(404).send('ERROR 404: Ruta no encontrada.');
});

export default router;
