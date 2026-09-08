import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default sequelize => {
	sequelize.define('genre', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
		},
	});
};
