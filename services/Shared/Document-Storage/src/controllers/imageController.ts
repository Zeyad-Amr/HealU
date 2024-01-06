import {Request, Response} from 'express';
import Image, {ValidImageType} from '../models/imageModel';
import {Op} from 'sequelize';
import asyncErrorCatching from '../utils.ts/asyncErrorCatching';
import multer from "multer";
import path from "path";
import {v4 as uuidv4} from 'uuid';
import sizeOf from 'image-size';
import fs from 'fs';
import dicomParser from 'dicom-parser';


const imageStoragePath =  '/uploads/';


const imageStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'src/uploads/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${uniqueSuffix}${fileExtension}`;
        cb(null, fileName)
    }
});

export const saveImageToDisk = multer({storage: imageStorage});

const createWhereClause = (query: any): any => {
    const whereClause: any = {};

    if (query.patientId) {
        whereClause.patientId = query.patientId;
    }

    if (query.imageType) {
        whereClause.imageType = query.imageType;
    }

    if (query.keyword) {
        whereClause.imageDescription = {
            [Op.iLike]: `%${query.keyword}%`,
        };
    }

    return whereClause;
};

export const getAllImages = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    const {query} = req
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
    const { imageId } = req.params;

    try {
        const image = await Image.findByPk(imageId);

        if (image) {
            const imagePath = path.join(path.resolve(__dirname, '..'), imageStoragePath, image.dataValues.imagePath);
            
            // Send the image file
            res.sendFile(imagePath);
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Image not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            error: 'Internal Server Error'
        });
    }
});

export const uploadImage = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    if (!req.file) {
        res.status(400).json({
            status: 'fail',
            error: 'No file uploaded'
        });
        return;
    }

    // get information about the uploaded image
    const imagePath: string = `/images/${req.file.filename}`;
    const imageType: any = path.extname(imagePath);

    let resolution: string = '';

    if (imageType === '.dcm') {
        const dicomFileBuffer = fs.readFileSync(req.file.path)
        const dataSet = dicomParser.parseDicom(dicomFileBuffer);
        const rows = dataSet.uint16('x00280010');
        const columns = dataSet.uint16('x00280011');
        resolution = `${rows}x${columns}`;
    } else {
        const dimensions = sizeOf(req.file.path);
        resolution = `${dimensions.width}x${dimensions.height}`;
    }


    let {patientId, imageDescription} = req.body;


    // Check if the provided imageType is a valid image type
    if (!Object.values(ValidImageType).includes(imageType)) {

        // Delete the uploaded image
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });

        res
            .status(400)
            .json({
                status: 'fail',
                error: 'Invalid imageType',
            });
        return;
    }

    const newImage = await Image.create({
        patientId,
        imageType,
        imageDescription,
        imagePath,
        resolution,
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

    const {imageId} = req.params;
    const updatedFields = req.body;

    // exclude the imagePath from the updatedFields
    delete updatedFields.imagePath;


    // Convert imageID to a number
    const imageIdAsNumber = imageId ? Number(imageId) : undefined;

    // Check if imageID is a valid number
    if (imageIdAsNumber === undefined || isNaN(imageIdAsNumber)) {
        res
            .status(400)
            .json({
                status: 'fail',
                error: 'Invalid imageID'
            });
    }

    // Find the image by its primary key (imageID)
    const image = await Image.findByPk(imageIdAsNumber);

    if (image) {
        // Update the fields of the image instance
        Object.assign(image, updatedFields);

        // Save the changes to the database
        await image.save();

        // Respond with the updated image
        res.json(image);
    } else {
        // If no image is found with the given imageID, return a 404 error
        res
            .status(404)
            .json({
                status: 'fail',
                error: 'Image not found'
            });
    }

});

export const deleteImageById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    const {imageId} = req.params;
    const image = await Image.findByPk(imageId);

    if (image) {
        await image.destroy();

        // Delete the image from the disk
        fs.unlink(path.join(imageStoragePath , image.dataValues.imagePath), (err) => {
            if (err) {
                console.error(err)
                return
            }
        });

        res
            .status(204)
            .send();
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
