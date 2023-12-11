// imageModel.ts
import { DataTypes, Model } from 'sequelize';
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

class Image extends Model<ImageAttributes> implements ImageAttributes {
  public PatientID!: number;
  public ImageID?: number;
  public ImageType!: string;
  public ImageDescription?: string; //optional
  public ImagePath!: string;
  public DateUploaded!: Date;
  public Resolution!: string;
 
}

Image.init(
  {
   
    PatientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    //   validate: {
    //     len: [1, 8],
    //   },
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
  },


  {
    sequelize,
    modelName: 'Image'

  }
);

export default Image;
