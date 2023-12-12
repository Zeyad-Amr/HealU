import express from 'express';
import * as imageController from '../controllers/imageController';

const router = express.Router();


router.route('/')
    .get(imageController.getAllImages)
    .post(imageController.uploadImage);

router.route('/:ImageID')
    .get(imageController.getImageById)
    .patch(imageController.updateImageById)
    .delete(imageController.deleteImageById);
    
export default router;
