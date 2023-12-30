import express from 'express';
import * as loginController from '../controllers/loginController';

const router = express.Router();

router.post('/', loginController.loginUser);

export default router;