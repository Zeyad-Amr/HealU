import express from 'express';
import * as imageController from '../controllers/imageController';

const router = express.Router();


// @TODO: edit this route to return all images using root path
router.get('/all', imageController.getAllImages);

// Define routes using the imageController methods
router.route('/')
    .post(imageController.uploadImage)
    .get(imageController.getImagesByPatientId)

  

router.route('/:ImageID')
    .get(imageController.getImageById)
    .patch(imageController.updateImageById)
    .delete(imageController.deleteImageById);

   
export default router;
