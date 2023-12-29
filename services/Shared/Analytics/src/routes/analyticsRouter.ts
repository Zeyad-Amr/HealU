import { Router } from "express";
import { get_analytics } from "../controllers/analyticsController";

const router = Router();

//create 
router.get('/analytics', get_analytics)


export default router;