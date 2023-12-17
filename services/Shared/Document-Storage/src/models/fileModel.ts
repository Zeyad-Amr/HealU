// FileModel.ts
import { DataTypes} from 'sequelize';
import sequelize from '../db';

// Enum definition
export enum ValidFileType {
  TXT = ".txt",
  CSV = ".csv",
  JSON = ".json",
  XML = ".xml",
  PDF =".pdf",
}

// defines the expected shape of the model
interface FileAttributes {
    PatientID: number;
    FileID?: number;
    FileType: string;
    FileDescription: string;
    FilePath: string;
    Author: string;
}

const File = sequelize.define("File",
  {
   
    PatientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FileID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FileType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [Object.values(ValidFileType)],
      },
    },
    FileDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    FilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }

)

File
    .sync()
    .then(()=>{
      console.log("File table synced")
    })


export default File;