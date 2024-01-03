// const  staffController = require("../controllers/userController");
// const express = require("express");
import express from 'express';
import * as staffController from '../controllers/staffController';
const router = express.Router();

router.get('/', staffController.getAllstaff); //  doctors and admin
router.get('/:userId', staffController.getStaffById);
router.get('/clinic/:clinicId', staffController.getDoctorsByClinicID);
router.post('/', staffController.createStaff);
router.put('/:userId', staffController.updateStaff);
router.delete('/:userId', staffController.deleteStaff);
export default router;