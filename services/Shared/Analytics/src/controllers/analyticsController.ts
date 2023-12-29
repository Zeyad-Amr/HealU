import { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../services/errorHandler';
const get_analytics = async (req: Request, res: Response) => {
    try {
        const [allClinicsRes] = await Promise.all([
            axios.get(`${process.env.Admin_URL}/api/v1/clinic`),
        ])
        console.log(allClinicsRes.data.data.clinics);

        return res.status(200).json({
            msg: "Hello, World!",
            clinics: allClinicsRes.data.data.clinics.length
        })

    } catch (error: any) {
        const err = errorHandler(error)
        res.status(err?.statusCode ?? 500).json(err)
    }
}


export {
    get_analytics
}

