import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/', userController.getAllUsers); 
router.get('/userId/:userId',userController.getUserById)
router.get('/userName/:userName',userController.getUserByUserName)
export default router;