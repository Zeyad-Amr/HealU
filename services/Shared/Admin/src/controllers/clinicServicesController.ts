import { Request, Response } from "express";
import ClinicService from "../models/clinicServiceModel";
import asyncErrorCatching from "../utils/asyncErrorCatching";


const createWhereClause = (req: Request) => {
    const whereClause: any = {};

    if (req.query.clinicId) {
        whereClause.clinicId = req.query.clinicId;
    }

    if (req.query.name) {
        whereClause.name = req.query.name;
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

    const clinicService = await ClinicService.create({
        name,
        description,
        price,
        clinicId,
    })

    if (!clinicService) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic service found with that ID',
            });
    }

    res
        .status(201)
        .json({
            status: 'success',
            data: {
                clinicService,
            },
        });
});


const createClinicServices = asyncErrorCatching(async (req: Request, res: Response) => {
    let {data} = req.body;

    data.forEach(async (clinicService: any) => {
        await ClinicService.create({
            name: clinicService.name,
            description: clinicService.description,
            price: clinicService.price,
            clinicId: clinicService.clinicId
        })
    })

    res
        .status(201)
        .json({
            status: 'success',
            data: null,
        })
})

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
    createClinicServices
};
