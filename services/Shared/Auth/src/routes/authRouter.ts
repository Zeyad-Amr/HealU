import { Router } from "express";
import { create_user, login_user } from "../controllers/authController";

const router = Router();

//create new authenticated user
router.post('/auth', create_user)
// login user
router.post('/auth/login', login_user)

export default router;