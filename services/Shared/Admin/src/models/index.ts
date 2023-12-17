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

    await sequelize.sync();
};

export default databaseTablesSync;
