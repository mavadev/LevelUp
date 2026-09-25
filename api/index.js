const { PORT = 3001 } = process.env;
import { conn } from './src/db.js';
import server from './src/app.js';

conn.sync({ alter: true }).then(() => {
	server.listen(PORT, '0.0.0.0', () => {
		console.log(`Server listening at http://0.0.0.0:${PORT}`);
	});
});
