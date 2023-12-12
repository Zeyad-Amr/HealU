import { Request, Response } from 'express';
import  Image  from '../models/imageModel';
import { Op } from 'sequelize';

export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log("getAllImages");
      const images = await Image.findAll();
      res.json(images);
  } catch (error) {
      console.error('Error fetching all images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
export const getImagesByPatientId = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log("getImagesByPatientId");

      const { PatientId, ImageType } = req.query;

      // Convert PatientId to a number, and handle the case where it's undefined
      const patientIdAsNumber = PatientId ? Number(PatientId) : undefined;
      console.log("patientID", patientIdAsNumber);

      // Use Sequelize's Op to build the WHERE clause
      const whereClause = {
          PatientID: patientIdAsNumber,
          ImageType,
      };

      const images = await Image.findAll({
          where: whereClause,
      });
      if (images.length > 0) {
        res.json(images);
      } else {
        res.status(404).json({ error: 'Wrong PatientID or ImageType' });
      }
  } catch (error) {
      console.error('Error fetching images by patient ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
    
  
export const getImageById = async (req: Request, res: Response): Promise<void> => {
    const { ImageID } = req.params;

    try {
      console.log("getImageById");
      const image = await Image.findByPk(ImageID);
      if (image) {
        res.json(image);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error fetching image by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    // Assuming the image details are provided in the request body
    const { PatientID, ImageType, ImageDescription, ImagePath, DateUploaded, Resolution } = req.body;
  
    try {
      console.log("uploadImage");
      const newImage = await Image.create({
        PatientID,
        // ImageID generated automatically
        ImageType,
        ImageDescription,
        ImagePath,
        DateUploaded,
        Resolution,
      });
  
      res.status(201).json(newImage);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const updateImageById = async (req: Request, res: Response): Promise<void> => {
  const { ImageID } = req.params;
  const updatedFields = req.body;

  try {
      console.log("updateImageById");
      console.log("updatedFields:", updatedFields);

      // Convert ImageID to a number
      const imageIdAsNumber = ImageID ? Number(ImageID) : undefined;

      // Check if ImageID is a valid number
      if (imageIdAsNumber === undefined || isNaN(imageIdAsNumber)) {
          res.status(400).json({ error: 'Invalid ImageID' });
          return;
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
          res.status(404).json({ error: 'Image not found' });
      }
  } catch (error) {
      console.error('Error updating image by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
export const deleteImageById = async (req: Request, res: Response): Promise<void> => {
    console.log("deleteImageById");
    const { ImageID } = req.params;
  
    try {
      const image = await Image.findByPk(ImageID);
      if (image) {
        await image.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error deleting image by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};