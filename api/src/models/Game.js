import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default sequelize => {
	sequelize.define(
		'game',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			slug: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			background_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			released: {
				type: DataTypes.DATEONLY,
			},
			rating: {
				type: DataTypes.DECIMAL,
			},
			website: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false },
	);
};
