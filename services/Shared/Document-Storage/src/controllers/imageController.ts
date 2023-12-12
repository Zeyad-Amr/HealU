import { Request, Response } from 'express';
import Image from '../models/imageModel';
import { Op } from 'sequelize';
import asyncErrorCatching from '../utils.ts/asyncErrorCatching';


const createWhereClause = (query: any): any => {
  const whereClause: any = {};

  if (query.PatientID) {
    whereClause.PatientID = query.PatientID;
  }

  if (query.ImageType) {
    whereClause.ImageType = query.ImageType;
  }

  if (query.Keyword) {
    whereClause.ImageDescription = {
      [Op.iLike]: `%${query.Keyword}%`,
    };
  }

  return whereClause;
};

export const getAllImages = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { query } = req
  const whereClause = createWhereClause(query);

  const images = await Image.findAll({
    where: whereClause,
  });

  res
    .status(200)
    .json({
      status: 'success',
      results: images.length,
      data: {
        images,
      },
    });

});


export const getImageById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { ImageID } = req.params;

  const image = await Image.findByPk(ImageID);

  if (image) {
    res.status(200).json({
      status: 'success',
      data: {
        image,
      },
    });
  }
  else {
    res
      .status(404)
      .json({
        status: 'fail',
        error: 'Image not found'
      });
  }
});

export const uploadImage = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  // Assuming the image details are provided in the request body
  const { PatientID, ImageType, ImageDescription, ImagePath, DateUploaded, Resolution } = req.body;

  const newImage = await Image.create({
    PatientID,
    // ImageID generated automatically
    ImageType,
    ImageDescription,
    ImagePath,
    DateUploaded,
    Resolution,
  });

  res
    .status(201)
    .json({
      status: 'success',
      data: {
        image: newImage,
      },
    });
});

export const updateImageById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { ImageID } = req.params;
  const updatedFields = req.body;

  // Convert ImageID to a number
  const imageIdAsNumber = ImageID ? Number(ImageID) : undefined;

  // Check if ImageID is a valid number
  if (imageIdAsNumber === undefined || isNaN(imageIdAsNumber)) {
    res
      .status(400)
      .json({
        status: 'fail',
        error: 'Invalid ImageID'
      });

  }

  // Find the image by its primary key (ImageID)
  const image = await Image.findByPk(imageIdAsNumber);

  if (image) {
    // Update the fields of the image instance
    Object.assign(image, updatedFields);

    // Save the changes to the database
    await image.save();

    // Respond with the updated image
    res.json(image);
  } else {
    // If no image is found with the given ImageID, return a 404 error
    res
      .status(404)
      .json({
        status: 'fail',
        error: 'Image not found'
      });
  }

});

export const deleteImageById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

  const { ImageID } = req.params;
  const image = await Image.findByPk(ImageID);

  if (image) {
    await image.destroy();
    res
      .status(204)
      .send();
  } else {
    res
      .status(404)
      .json({
        status: 'fail',
        error: 'Image not found'
      });
  }
});