import sequelize from '../db';
import {DataTypes} from 'sequelize';

const ClinicService = sequelize.define('ClinicService', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false,
});

export default ClinicService;
