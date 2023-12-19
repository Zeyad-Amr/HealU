import express from 'express';
import * as fileController from '../controllers/fileController';

const router = express.Router();

router.route('/')
    .get(fileController.getAllFiles)
    .post(fileController.saveFileToDisk.single('file'), fileController.uploadFile);

router.route('/:fileId')
    .get(fileController.getFileById)
    .patch(fileController.updateFileById)
    .delete(fileController.deleteFileById);

export default router;
