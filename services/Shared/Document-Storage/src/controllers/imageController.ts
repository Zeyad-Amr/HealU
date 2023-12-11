import { Request, Response } from 'express';
import  Image  from '../models/imageModel';
import { Op } from 'sequelize';

export const getAllImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await Image.findAll();
      res.json(images);
    } catch (error) {
      console.error('Error fetching all images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const getImagesByPatientId = async (req: Request, res: Response): Promise<void> => {
const { PatientId, ImageType } = req.query;

    try {
        // Convert PatientId to a number, and handle the case where it's undefined
        const patientIdAsNumber = PatientId ? Number(PatientId) : undefined;

        // Use Sequelize's Op to build the WHERE clause
        const whereClause = {
        PatientID: { [Op.eq]: patientIdAsNumber },
        ImageType: { [Op.eq]: ImageType },
        };

        const images = await Image.findAll({
        where: whereClause,
        });

        res.json(images);
    } catch (error) {
        console.error('Error fetching images by patient ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const getImageById = async (req: Request, res: Response): Promise<void> => {
    const { ImageID } = req.params;

    try {
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
      const image = await Image.findByPk(ImageID);
      if (image) {
        await image.update(updatedFields);
        res.json(image);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error updating image by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const deleteImageById = async (req: Request, res: Response): Promise<void> => {
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