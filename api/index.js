const { PORT = 3001 } = process.env;
import { conn } from './src/db.js';
import server from './src/app.js';

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(PORT, () => console.log(`Server listening at ${PORT}`));
});
