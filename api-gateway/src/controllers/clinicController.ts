import axios from 'axios';
import { Request, Response } from 'express';
import { errorHandler } from '../services';


export const get_patient_data = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params

        const [personalData, medicalRecord, medicalHistory] = await Promise.all([
            axios.get(`${process.env.Registration_URL}/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/record/patient/${patientId}`),
            axios.get(`${process.env.EMR_URL}/medical-history/${patientId}`),
        ])

        return res.status(200).json({
            personalData: personalData.data,
            medicalRecord: medicalRecord.data,
            medicalHistory: medicalHistory.data
        })

    } catch (error: any) {
        const err = errorHandler(error)

        res.status(err?.statusCode ?? 500).json(err)
    }
}