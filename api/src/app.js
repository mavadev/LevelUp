import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import './db.js';

const server = express();

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:8888',
	'http://192.168.18.4:3000',
	'http://192.168.18.4:8888',
	'levelup-mavadev.vercel.app',
];

// Configuración con la librería CORS
server.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Bloqueado por políticas de CORS (Origen no permitido)'));
			}
		},
		credentials: true,
		methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
	}),
);

server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Rutas
server.use('/api', routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

export default server;
