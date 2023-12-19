import express from 'express';
import * as staffController from '../controllers/userController';

const router = express.Router();

router.get('/', staffController.getAllUsers); 
router.get('/:role', staffController.getAllUsersByRole); // users include patients , doctors and admin
router.get('/staff/:userID', staffController.getUserById);
router.post('/staff', staffController.createUser);
router.put('/staff/:userID', staffController.updateUser);
router.delete('/staff/:userID', staffController.deleteUser);

export default router;