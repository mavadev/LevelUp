import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Importa los modelos directamente
import GameModel from './models/Game.js';
import GenreModel from './models/Genre.js';
import PlatformModel from './models/Platform.js';
import TagModel from './models/Tag.js';

const { DB_USER, DB_PASSWORD, DB_HOST, DB, DATABASE_URL, NODE_ENV } = process.env;

// Conexión a PostgreSQL
let sequelize = !NODE_ENV
	? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
			logging: false,
			native: false,
		})
	: new Sequelize(DATABASE_URL, {
			logging: false,
			native: false,
			dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
		});
// Comprobar conexión
sequelize
	.authenticate()
	.then(() => console.log('Connected Database!'))
	.catch(err => console.warn('Database connection error:' + err));

// Inicializamos los modelos
GameModel(sequelize);
GenreModel(sequelize);
PlatformModel(sequelize);
TagModel(sequelize);

// Capitalizamos los nombres de los modelos
const formattedModels = Object.fromEntries(
	Object.entries(sequelize.models).map(([name, model]) => {
		const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
		return [capitalizedName, model];
	}),
);
sequelize.models = formattedModels;

const { Game, Genre, Platform, Tag } = sequelize.models;

// Definir relaciones entre modelos
Game.belongsToMany(Genre, { through: 'game_genre', timestamps: false });
Genre.belongsToMany(Game, { through: 'game_genre', timestamps: false });

Game.belongsToMany(Platform, { through: 'game_platform', timestamps: false });
Platform.belongsToMany(Game, { through: 'game_platform', timestamps: false });

Game.belongsToMany(Tag, { through: 'game_tag', timestamps: false });
Tag.belongsToMany(Game, { through: 'game_tag', timestamps: false });

export { Game, Genre, Platform, Tag };
export const conn = sequelize;
export default sequelize.models;
