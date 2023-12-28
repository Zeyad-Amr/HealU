import sequelize from '../db';
import { DataTypes } from 'sequelize';


const Clinic = sequelize.define('Clinic', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    operatingHours: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    doctorsIds: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
}, {
    timestamps: false,
});

export default Clinic;

