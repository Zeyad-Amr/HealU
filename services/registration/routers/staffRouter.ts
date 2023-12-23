// const  staffController = require("../controllers/userController");
// const express = require("express");
import express from 'express';
import * as staffController from '../controllers/staffController';
const router = express.Router();

router.get('/', staffController.getAllstaff); //  doctors and admin
router.get('/:userID', staffController.getALLStaffById);
router.get('/clinic/:clinicID', staffController.getDoctorsByClinicID);
router.post('/', staffController.createStaff);
router.put('/:userID', staffController.updateStaff);
router.delete('/:userID', staffController.deleteStaff);
export default router;