import 'dotenv/config';
import { readdirSync } from 'fs';
import { Sequelize } from 'sequelize';
import { basename, dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const { DB_USER, DB_PASSWORD, DB_HOST, DB, DATABASE_URL, NODE_ENV } = process.env;

// Configuración de variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conexión a PostgreSQL
let sequelize;

if (!NODE_ENV) {
	// Desarrollo local
	sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
		logging: false,
		native: false,
	});
} else {
	// Producción
	sequelize = new Sequelize(DATABASE_URL, {
		logging: false,
		native: false,

		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
}

// Comprobar conexión
sequelize
	.authenticate()
	.then(() => console.log('Connected Database!'))
	.catch(err => console.warn('Database connection error:' + err));

// Buscar los modelos de DB
const modelsPath = join(__dirname, 'models');
const currentFile = basename(__filename);

const modelFiles = readdirSync(modelsPath).filter(file => {
	return file !== currentFile && !file.startsWith('.') && file.endsWith('.js');
});

// Cargar los modelos
const models = [];
for (const file of modelFiles) {
	const model = await import(pathToFileURL(join(modelsPath, file)));
	models.push(model.default);
}

// Registrar los modelos en Sequalize
models.forEach(model => {
	model(sequelize);
});

// Obtener los modelos registrados
const sequelizeModels = sequelize.models;

// Capitalizamos los nombres de los modelos
const formattedModels = Object.fromEntries(
	Object.entries(sequelizeModels).map(([name, model]) => {
		const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

		return [capitalizedName, model];
	}),
);
sequelize.models = formattedModels;

// Obtenemos los modelos para relacionarlos
const { Game, Genre } = sequelize.models;

// Definir relaciones entre modelos
Game.belongsToMany(Genre, { through: 'game_genre' });
Genre.belongsToMany(Game, { through: 'game_genre' });

export { Game, Genre };
export const conn = sequelize;
export default sequelize.models;
