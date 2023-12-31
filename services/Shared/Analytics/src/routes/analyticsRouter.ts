import { Router } from "express";
import { getAnalytics, getAnalyticsMock } from "../controllers/analyticsController";

const router = Router();

//create 
router.get('/analytics', getAnalyticsMock)
router.get('/analytics-test', getAnalytics)


export default router;