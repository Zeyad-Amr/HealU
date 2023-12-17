import Clinic from '../models/clinicModel';
import {Request, Response} from 'express';
import asyncErrorCatching from '../utils/asyncErrorCatching';
import {Op} from 'sequelize';

const createQueryWhereClause = (req: Request) => {
    const whereClause: any = {};

    if (req.query.doctorId) {
        whereClause.doctorsIds = {
            [Op.contains]: [req.query.doctorId],
        }
    }

    return whereClause;
};

const createQueryWhereClauseForClinicService = (req: Request) => {
    const whereClause: any = {};

    if (req.query.serviceId) {
        whereClause.id = req.query.serviceId;
    }

    return whereClause;
};

const createQueryOptions = (req: Request) => {
    const options: any = {};

    if (req.query.doctorId) {
        options.where = createQueryWhereClause(req);
    }

    if (req.query.serviceId) {
        options.include = {
            association: "services",
            where: createQueryWhereClauseForClinicService(req),
        }
    }

    return options;
};

const getAllClinics = asyncErrorCatching(async (req: Request, res: Response) => {

    const options = createQueryOptions(req);

    console.log(options)

    const clinics = await Clinic.findAll(options);

    if (!clinics || clinics.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No clinics found',
        });
    }

    res
        .status(200)
        .json({
            status: 'success',
            results: clinics.length,
            data: {
                clinics,
            },
        });
});

const getClinicByClinicId = asyncErrorCatching(async (req: Request, res: Response) => {

    const {clinicId} = req.params;

    const clinic = await Clinic.findByPk(clinicId, {
        include: ["services"],
    });

    if (!clinic) {
        return res.status(404).json({
            status: 'fail',
            message: 'No clinic found with that id',
        });
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: {
                clinic,
            },
        });
});


const createClinic = asyncErrorCatching(async (req: Request, res: Response) => {

    let {name, description, operatingHours, doctorsIds} = req.body;

    const clinic = await Clinic.create(
        {
            name,
            description,
            operatingHours,
            doctorsIds
        });

    res
        .status(201)
        .json({
            status: 'success',
            data: {
                clinic,
            },
        });
});

const updateClinic = asyncErrorCatching(async (req: Request, res: Response) => {
    const clinic = await Clinic.update(req.body, {
        where: {
            id: req.params.clinicId,
        },
    });

    if (!clinic) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic found with that ID',
            });
    }

    res
        .status(200)
        .json({
            status: 'success',
            data: {
                clinic: clinic,
            },
        });
});

const deleteClinic = asyncErrorCatching(async (req: Request, res: Response) => {

    const {clinicId} = req.params;

    const clinic = await Clinic.destroy({
        where: {
            id: req.params.clinicId,
        },
    });

    if (!clinic) {
        return res
            .status(404)
            .json({
                status: 'fail',
                message: 'No clinic found with that ID',
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
    getAllClinics,
    getClinicByClinicId,
    createClinic,
    updateClinic,
    deleteClinic,
};



