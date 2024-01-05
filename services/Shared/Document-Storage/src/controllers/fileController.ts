import {Request, Response} from 'express';
import File from '../models/fileModel';
import {Op} from 'sequelize';
import asyncErrorCatching from '../utils.ts/asyncErrorCatching';
import {ValidFileType} from '../models/fileModel';
import multer from "multer";
import path from "path";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
import 'dotenv/config';


const fileStoragePath = '/uploads/';


const fileStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'src/uploads/files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${uniqueSuffix}${fileExtension}`;
        cb(null, fileName)
    },
});

export const saveFileToDisk = multer({storage: fileStorage});


const createWhereClause = (query: any): any => {
    const whereClause: any = {};

    if (query.patientId) {
        whereClause.patientId = query.patientId;
    }

    if (query.fileType) {
        whereClause.fileType = query.fileType;
    }

    if (query.keyword) {
        whereClause.fileDescription = {
            [Op.iLike]: `%${query.keyword}%`,
        };
    }

    return whereClause;
}

export const getAllFiles = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    const {query} = req
    const whereClause = createWhereClause(query);

    console.log(whereClause)

    const files = await File.findAll({
        where: whereClause,
    });

    if (!files || files.length === 0) {
        res
            .status(404)
            .json({
                status: 'fail',
                error: 'No files found'
            });
        return;
    }

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
    const { fileId } = req.params;

    try {
        const file = await File.findByPk(fileId);

        if (file) {
            const filePath = path.join(path.resolve(__dirname, '..'), fileStoragePath, file.dataValues.filePath);
            // Send the image file
            res.sendFile(filePath);
        } else {
            res
            .status(200).json({
                status: 'fail',
                error: 'File not found'
            });
        }
    } catch (error) {
        console.error(error);
        res
        .status(404).json({
            status: 'fail',
            error: 'Internal Server Error'
        });
    }
});

export const uploadFile = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    if (!req.file) {
        res
            .status(400)
            .json({
                status: 'fail',
                error: 'No file uploaded'
            });
        return;
    }

    const filePath: string = `/files/${req.file.filename}`
    const fileType: any = path.extname(filePath)

    // Assuming the file details are provided in the request body
    const {patientId, fileDescription, author} = req.body;

    // Check if the provided FileType is a valid enum value
    if (!Object.values(ValidFileType).includes(fileType)) {

        // Delete the uploaded file
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
                error: 'Invalid FileType',
            });
        return;
    }

    const file = await File.create({
        patientId,
        fileType,
        fileDescription,
        filePath,
        author,
    });

    res
        .status(201)
        .json({
            status: 'success',
            data: {
                file,
            },
        });
});

export const updateFileById = asyncErrorCatching(async (req: Request, res: Response): Promise<void> => {

    const {fileId} = req.params;
    const updatedFields = req.body;

    // Convert fileID to a number
    const fileIdAsNumber = fileId ? Number(fileId) : undefined;

    // Check if fileID is a valid number
    if (fileIdAsNumber === undefined || isNaN(fileIdAsNumber)) {
        res
            .status(400)
            .json({
                status: 'fail',
                error: 'Invalid fileID'
            });
        return;
    }

    // Find the file by its primary key (fileID)
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
                data: {file}
            });
    } else {
        // If no file is found with the given fileID, return a 404 error
        res
            .status(404)
            .json({
                status: 'fail',
                error: 'File not found'
            });
    }

});

export const deleteFileById = async (req: Request, res: Response): Promise<void> => {
    const {fileId} = req.params;
    const file = await File.findByPk(fileId);

    if (file) {
        await file.destroy();
        // Delete the file from the disk
        fs.unlink(path.join(fileStoragePath, file.dataValues.filePath), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'fail',
                    error: 'An error occurred while deleting the file'
                });
                return;
            }
            res.status(204).send();
        });

    } else {
        res
            .status(404)
            .json({
                status: 'fail',
                error: 'File not found'
            });
    }
};

