import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default sequelize => {
	sequelize.define('game', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		background_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description_raw: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		released: {
			type: DataTypes.DATEONLY,
		},
		rating: {
			type: DataTypes.DECIMAL,
		},
		platforms: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
		tags: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
		website: {
			type: DataTypes.STRING,
		},
	});
};
