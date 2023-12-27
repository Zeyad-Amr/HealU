import { Router } from "express";
import { login_user } from "../controllers/authController";

const router = Router();

// login user
router.post('/login', login_user)

export default router;