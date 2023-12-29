import { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../services/errorHandler';
import { getNumberOfClinics, getNumberOfServices } from '../services/adminService';
import { getNumberOfAppointments } from '../services/appointmentsService';
const get_analytics = async (req: Request, res: Response) => {
    try {
        console.log("Analytics service is called")
        console.log(`${process.env.Admin_URL}/api/v1/clinic`)
        console.log(`${process.env.Admin_URL}/api/v1/clinicService`)
        console.log(`${process.env.Appointment_URL}/appointments`)


        const [allClinicsRes, allServicesRes, allAppoitments] = await Promise.all([
            axios.get(`${process.env.Admin_URL}/api/v1/clinic`),
            axios.get(`${process.env.Admin_URL}/api/v1/clinicService`),
            axios.get(`${process.env.Appointment_URL}/appointments`),
        ])

        return res.status(200).json({
            msg: "Analytics data returned successfull",
            clinics: getNumberOfClinics(allClinicsRes.data.data.clinics),
            services: getNumberOfServices(allServicesRes.data.data.clinicServices),
            appointments: getNumberOfAppointments(allAppoitments.data),
        })

    } catch (error: any) {
        const err = errorHandler(error)
        res.status(err?.statusCode ?? 500).json(err)
    }
}


export {
    get_analytics
}

