// imageModel.ts
import {DataTypes} from 'sequelize';
import sequelize from '../db';


// Enum definition
export enum ValidImageType {
    JPEG = '.jpeg',
    JPG = '.jpg',
    PNG = '.png',
    GIF = '.gif',
    BMP = '.bmp',
    DICOM = '.dcm',
    // Add more image types as needed
}


// defines the expected shape of the model
interface ImageAttributes {
    patientId: number;
    imageId?: number;
    imageType: string;
    imageDescription?: string;
    imagePath: string;
    dateUploaded: Date;
    resolution: string;
}

const Image = sequelize.define("Image",
    {

        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        imageType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(ValidImageType)],
            },
        },
        imageDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resolution: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
)


Image
    .sync({alter: true})
    .then(() => {
        console.log("Image table synced")
    })


export default Image;
