import express from 'express';
import * as fileController from '../controllers/fileController';

const router = express.Router();


// @TODO: edit this route to return all Files using root path
router.get('/all', fileController.getAllFiles);
router.get('/search', fileController.searchFilesByKeyword);

// Define routes using the fileController methods
router.route('/')
    .post(fileController.uploadFile)
    .get(fileController.getFileByPatientId)
    

  

router.route('/:FileID')
    .get(fileController.getFileById)
    .patch(fileController.updateFileById)
    .delete(fileController.deleteFileById);

   
export default router;
