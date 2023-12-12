import { Request, Response } from 'express';
import  File  from '../models/fileModel';
import { Op } from 'sequelize';

export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log("getAllFiles");
      const files = await File.findAll();
      res.json(files);
  } catch (error) {
      console.error('Error fetching all files:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
export const getFileByPatientId = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log("getFilesByPatientId");

      const { PatientId, FileType } = req.query;

      // Convert PatientId to a number, and handle the case where it's undefined
      const patientIdAsNumber = PatientId ? Number(PatientId) : undefined;
      console.log("patientID", patientIdAsNumber);

      // Use Sequelize's Op to build the WHERE clause
      const whereClause = {
          PatientID: patientIdAsNumber,
          FileType,
      };

      const files = await File.findAll({
          where: whereClause,
      });
      if (files.length > 0) {
        res.json(files);
      } else {
        res.status(404).json({ error: 'Wrong PatientID or FileType' });
      }
  } catch (error) {
      console.error('Error fetching files by patient ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
    
  
export const getFileById = async (req: Request, res: Response): Promise<void> => {
    const { FileID } = req.params;

    try {
      console.log("getFileById");
      const file = await File.findByPk(FileID);
      if (file) {
        res.json(file);
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      console.error('Error fetching file by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    // Assuming the file details are provided in the request body
    const { PatientID, FileType, FileDescription, FilePath, Author } = req.body;
  
    try {
      console.log("uploadFile");
      const newFile = await File.create({
        PatientID,
        // FileID generated automatically
        FileType,
        FileDescription,
        FilePath,
        Author,
      });
  
      res.status(201).json(newFile);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const updateFileById = async (req: Request, res: Response): Promise<void> => {
  const { FileID } = req.params;
  const updatedFields = req.body;

  try {
      console.log("updateFileById");
      console.log("updatedFields:", updatedFields);

      // Convert FileID to a number
      const fileIdAsNumber = FileID ? Number(FileID) : undefined;

      // Check if FileID is a valid number
      if (fileIdAsNumber === undefined || isNaN(fileIdAsNumber)) {
          res.status(400).json({ error: 'Invalid FileID' });
          return;
      }

      // Find the file by its primary key (FileID)
      const file = await File.findByPk(fileIdAsNumber);

      if (file) {
          // Update the fields of the file instance
          Object.assign(file, updatedFields);

          // Save the changes to the database
          await file.save();

          // Respond with the updated file
          res.json(file);
      } else {
          // If no file is found with the given FileID, return a 404 error
          res.status(404).json({ error: 'File not found' });
      }
  } catch (error) {
      console.error('Error updating file by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
export const deleteFileById = async (req: Request, res: Response): Promise<void> => {
    console.log("deleteFileById");
    const { FileID } = req.params;
  
    try {
      const file = await File.findByPk(FileID);
      if (file) {
        await file.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      console.error('Error deleting file by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const searchFilesByKeyword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            res.status(400).json({ error: 'Keyword is required for the search' });
            return;
        }

        const files = await File.findAll({
            where: {
                FileDescription: {
                    [Op.iLike]: `%${keyword}%`, // Case-insensitive search for the keyword in the description
                },
            },
        });

        if (files.length > 0) {
            res.json(files);
        } else {
            res.status(404).json({ error: 'No files found with the specified keyword in the description' });
        }
    } catch (error) {
        console.error('Error searching files by keyword:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};