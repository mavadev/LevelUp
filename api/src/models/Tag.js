import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default sequelize => {
	sequelize.define(
		'tag',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			slug: {
				type: DataTypes.STRING,
			},
			background_image: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false },
	);
};
