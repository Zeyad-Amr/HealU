// FileModel.ts
import {DataTypes} from 'sequelize';
import sequelize from '../db';

// Enum definition
export enum ValidFileType {
    TXT = ".txt",
    CSV = ".csv",
    JSON = ".json",
    XML = ".xml",
    PDF = ".pdf",
}

// defines the expected shape of the model
interface FileAttributes {
    patientId: number;
    fileId?: number;
    fileType: string;
    fileDescription: string;
    filePath: string;
    author: string;
}

const File = sequelize.define("File",
    {
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fileId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(ValidFileType)],
            },
        },
        fileDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        filePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
)

File
    .sync({alter: true})
    .then(() => {
        console.log("File table synced")
    })


export default File;
