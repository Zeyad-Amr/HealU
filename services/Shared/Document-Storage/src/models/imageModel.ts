// imageModel.ts
import { DataTypes} from 'sequelize';
import sequelize from '../db';

// defines the expected shape of the model
interface ImageAttributes {
    PatientID: number;
    ImageID?: number;
    ImageType: string;
    ImageDescription?: string;
    ImagePath: string;
    DateUploaded: Date;
    Resolution: string;
}

const Image = sequelize.define("Image",
  {
   
    PatientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ImageID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ImageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ImageDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ImagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateUploaded: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Resolution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }

)

Image
    .sync()
    .then(()=>{
      console.log("Image table synced")
    })


export default Image;