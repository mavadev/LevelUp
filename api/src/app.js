import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import './db.js';

const server = express();

// Configuración
server.use(cors());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	const allowedOrigins = [
		'http://localhost:3000',
		'http://192.168.0.*:3000',
		'https://videogames-app-nu.vercel.app',
		'https://videogames-app-gianmarcovc.vercel.app',
		'https://videogames-app-git-master-gianmarcovc.vercel.app',
	];

	const { origin } = req.headers;
	if (allowedOrigins.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	next();
});

// Rutas
server.use('/api', routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

export default server;
