import Clinic from '../models/clinicModel';
import { Request, Response } from 'express';


const getAllClinics = async (req: Request, res: Response) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json({
      status: 'success',
      results: clinics.length,
      data: {
        clinics,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getClinicByClinicId = async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        clinic,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getClinicByDoctorId = async (req: Request, res: Response) => {
    try {
        const clinics = await Clinic.find({ doctors: { $in: [req.params.id] } });
        res.status(200).json({
        status: 'success',
        results: clinics.length,
        data: {
            clinics,
        },
        });
    } catch (err: any) {
        res.status(404).json({
        status: 'fail',
        message: err.message,
        });
    }
};

const getClinicByServiceId = async (req: Request, res: Response) => {
    try {
        const clinics = await Clinic.find({ services: { $in: [req.params.id] } });
        res.status(200).json({
        status: 'success',
        results: clinics.length,
        data: {
            clinics,
        },
        });
    } catch (err: any) {
        res.status(404).json({
        status: 'fail',
        message: err.message,
        });
    }
};

const createClinic = async (req: Request, res: Response) => {
    try {
        
        const { name, description, operatingHours, doctors, services } = req.body;
        const newClinic = await Clinic.create({
            name,
            description,
            operatingHours,
            doctors,
            services,
        });
        res.status(201).json({
        status: 'success',
        data: {
            clinic: newClinic,
        },
        });
    } catch (err: any) {
        res.status(400).json({
        status: 'fail',
        message: err.message,
        });
    }
};

const updateClinic = async (req: Request, res: Response) => {
    try {
        const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body , {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
        status: 'success',
        data: {
            clinic,
        },
        });
    } catch (err: any) {
        res.status(404).json({
        status: 'fail',
        message: err.message,
        });
    }
};

const deleteClinic = async (req: Request, res: Response) => {
    try {
        await Clinic.findByIdAndDelete(req.params.id);
        res.status(204).json({
        status: 'success',
        data: null,
        });
    } catch (err: any) {
        res.status(404).json({
        status: 'fail',
        message: err.message,
        });
    }
};

export default {
    getAllClinics,
    getClinicByClinicId,
    getClinicByDoctorId,
    getClinicByServiceId,
    createClinic,
    updateClinic,
    deleteClinic,
};



