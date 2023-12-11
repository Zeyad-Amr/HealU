import express from 'express';
import * as imageController from '../controllers/imageController';

const router = express.Router();

// Define routes using the imageController methods
router.get('/api/v1/images/:ImageID', imageController.getImageById);
router.get('/api/v1/images/:PatientId', imageController.getImagesByPatientId);
router.get('/api/v1/images', imageController.getAllImages);
router.post('/api/v1/images', imageController.uploadImage);
router.patch('/api/v1/images/:ImageID', imageController.updateImageById);
router.delete('/api/v1/images/:ImageID', imageController.deleteImageById);

export default router;
