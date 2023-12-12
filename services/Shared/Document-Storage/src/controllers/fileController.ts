import { Request, Response } from 'express';
import File from '../models/fileModel';
import { Op } from 'sequelize';
import asyncErrorCatching from '../utils.ts/asyncErrorCatching';


const createWhereClause = (query: any): any => {
  const whereClause: any = {};

  if (query.PatientID) {
    whereClause.PatientID = query.PatientID;
  }

  if (query.FileType) {
    whereClause.FileType = query.FileType;
  }

  if (query.Keyword) {
    whereClause.FileDescription = {
      [Op.iLike]: `%${query.Keyword}%`,
    };
  }

  return whereClause;
}

export const getAllFiles = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { query } = req
  const whereClause = createWhereClause(query);

  const files = await File.findAll({
    where: whereClause,
  });
  res
    .status(200)
    .json({
      status: 'success',
      results: files.length,
      data: {
        files,
      },
    });
});

export const getFileById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { FileID } = req.params;
  const file = await File.findByPk(FileID);

  if (file) {
    res
    .status(200).json({
      status: 'success',
      data: {
        file,
      },
    });
  } 
  
  else {
    res
      .status(404)
      .json({ 
        status: 'fail',
        error: 'File not found' 
      });
  }
});

export const uploadFile = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  // Assuming the file details are provided in the request body
  const { PatientID, FileType, FileDescription, FilePath, Author } = req.body;

  const newFile = await File.create({
    PatientID,
    // FileID generated automatically
    FileType,
    FileDescription,
    FilePath,
    Author,
  });

  res
    .status(201)
    .json({
      status: 'success',
      data: {
        file: newFile,
      },
    });
});

export const updateFileById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { FileID } = req.params;
  const updatedFields = req.body;

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
    res
      .status(200)
      .json({ 
        status: 'success',
        data: { file } 
      });
  } 
  else {
    // If no file is found with the given FileID, return a 404 error
    res
      .status(404)
      .json({
        status: 'fail',
        error: 'File not found' 
      });
  }

});

export const deleteFileById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {
  const { FileID } = req.params;

  const file = await File.findByPk(FileID);
  if (file) {
    await file.destroy();
    res
    .status(204)
    .send();
  } else {
    res
    .status(404)
    .json({ 
      status: 'fail',
      error: 'File not found' 
    });
  }
});
