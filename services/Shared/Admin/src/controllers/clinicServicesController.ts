import ClinicService from "../models/clinicServiceModel";
import { Request, Response } from "express";


const getAllClinicServices = async (req: Request, res: Response) => {
  try {
    const clinicServices = await ClinicService.find();
    res.status(200).json({
      status: "success",
      results: clinicServices.length,
      data: {
        clinicServices,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getClinicServiceByServiceId = async (req: Request, res: Response) => {
  try {
    const clinicService = await ClinicService.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        clinicService,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getClinicServicesByClinicId = async (req: Request, res: Response) => {
    try {
        const clinicServices = await ClinicService.find({ clinicID: req.params.id });
        res.status(200).json({
        status: "success",
        results: clinicServices.length,
        data: {
            clinicServices,
        },
        });
    } catch (err: any) {
        res.status(404).json({
        status: "fail",
        message: err.message,
        });
    }
};

const createClinicService = async (req: Request, res: Response) => {
  try {
    const { name, description, price, clinicID, doctors } = req.body;
    const newClinicService = await ClinicService.create({
      name,
      description,
      price,
      clinicID,
      doctors,
    });
    res.status(201).json({
      status: "success",
      data: {
        clinicService: newClinicService,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateClinicService = async (req: Request, res: Response) => {
  try {
    const clinicService = await ClinicService.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        clinicService,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteClinicService = async (req: Request, res: Response) => {
  try {
    await ClinicService.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export default {
    getAllClinicServices,
    getClinicServiceByServiceId,
    getClinicServicesByClinicId,
    createClinicService,
    updateClinicService,
    deleteClinicService,
    };
