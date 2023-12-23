import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/', userController.getAllUsers); 
router.get('/:userID',userController.getALLUserById)
export default router;