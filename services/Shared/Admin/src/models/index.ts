import sequelize from "../db";
import Clinic from "../models/clinicModel";
import ClinicService from "../models/clinicServiceModel";

const databaseTablesSync = async () => {
    Clinic.hasMany(ClinicService, {
        foreignKey: 'clinicId',
        as: 'services',
    });

    ClinicService.belongsTo(Clinic, {
        foreignKey: 'clinicId',
        as: 'clinic',
    });

    Clinic.belongsTo(ClinicService, {
        foreignKey: 'defaultServiceId',
        as: 'defaultService', // Alias for the association
        targetKey: 'id'
    });

    await sequelize.sync();
};

export default databaseTablesSync;
