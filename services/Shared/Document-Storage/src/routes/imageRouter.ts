import express from 'express';
import * as imageController from '../controllers/imageController';

const router = express.Router();

router.route('/')
    .get(imageController.getAllImages)
    .post(imageController.saveImageToDisk.single('image'), imageController.uploadImage);

router.route('/:imageId')
    .get(imageController.getImageById)
    .patch(imageController.updateImageById)
    .delete(imageController.deleteImageById);

export default router;
