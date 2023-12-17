import { Request, Response } from "express";
import ClinicService from "../models/clinicServiceModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";


const createWhereClause = (req: Request) => {
    const whereClause: any = {};

    if (req.query.clinicId) {
        whereClause.clinicId = req.query.clinicId;
    }

    return whereClause;
};

const getAllClinicServices = asyncErrorCatching(async (req: Request, res: Response) => {

    const whereClause = createWhereClause(req);

    const clinicServices = await ClinicService.findAll({
        where: whereClause,
    });

    if (!clinicServices || clinicServices.length === 0) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic services found',
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            results: clinicServices.length,
            data: {
                clinicServices,
            },
        });
});

const getClinicServiceByServiceId = asyncErrorCatching(async (req: Request, res: Response) => {
    const clinicService = await ClinicService.findByPk(req.params.serviceId);

    if (!clinicService) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic service found with that ID',
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: {
                clinicService,
            },
        });
});

const createClinicService = asyncErrorCatching(async (req: Request, res: Response) => {
    let { name, clinicId, description, price } = req.body;
    console.log(name, clinicId, description, price)

    const clinicService = await ClinicService.create({
        name,
        description,
        price,
        clinicId,
    });

    res
        .status(201)
        .json({
            status: 'success',
            data: {
                clinicService,
            },
        });
});

const updateClinicService = asyncErrorCatching(async (req: Request, res: Response) => {
    const clinicService = await ClinicService.update(req.body, {
        where: {
            id: req.params.serviceId,
        },
    });

    if (!clinicService) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic service found with that ID',
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: {
                clinicService,
            },
        });
});

const deleteClinicService = asyncErrorCatching(async (req: Request, res: Response) => {
    const clinicService= await ClinicService.destroy({
        where: {
            id: req.params.serviceId,
        },
    });

    if (!clinicService) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic service found with that ID',
            });
    }

    res
        .status(204)
        .json({
            status: 'success',
            data: null,
        });
});


export default {
    getAllClinicServices,
    getClinicServiceByServiceId,
    createClinicService,
    updateClinicService,
    deleteClinicService,
};
