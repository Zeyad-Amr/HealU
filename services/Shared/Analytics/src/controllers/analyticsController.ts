import { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../services/errorHandler';
import { getNumberOfClinics, getNumberOfServices } from '../services/adminService';
import { getNumberOfAppointments } from '../services/appointmentsService';
import { getNumberOfDoctors, getNumberOfPatients } from '../services/registrationService';
import { getNumberOfDocuments } from '../services/storageService';
import { getNumberOfMedicalHistory, getNumberOfMedicalRecords, getNumberOfPrescriptions } from '../services/emrService';
const get_analytics = async (req: Request, res: Response) => {
    try {

        console.log("Analytics service is called");

        const [
            allClinicsRes,
            allServicesRes,
            allAppoitments,
            allStaffs,
            allUsers,
            allImages,
            allFiles,
            allPrescriptions,
            allReports,
            allMedicalHistory
        ] = await Promise.all([

            axios.get(`${process.env.Admin_URL}/api/v1/clinic`),
            axios.get(`${process.env.Admin_URL}/api/v1/clinicService`),
            axios.get(`${process.env.Appointment_URL}/appointments`),
            axios.get(`${process.env.Registration_URL}/staff`),
            axios.get(`${process.env.Registration_URL}/user`),
            axios.get(`${process.env.Storage_URL}/api/v1/images`),
            axios.get(`${process.env.Storage_URL}/api/v1/files`),
            axios.get(`${process.env.EMR_URL}/prescription`),
            axios.get(`${process.env.EMR_URL}/record`),
            axios.get(`${process.env.EMR_URL}/medical-history`),

        ]);

        return res.status(200).json({
            status: 'success',
            message: 'Analytics data fetched successfully',
            data: {
                clinics: getNumberOfClinics(allClinicsRes.data.data.clinics),
                services: getNumberOfServices(allServicesRes.data.data.clinicServices),
                appointments: getNumberOfAppointments(allAppoitments.data),
                doctors: getNumberOfDoctors(allStaffs.data.data),
                patients: getNumberOfPatients(allUsers.data.data),
                documents: getNumberOfDocuments(allImages.data.data.images, allFiles.data.data.files),
                prescriptions: getNumberOfPrescriptions(allPrescriptions.data),
                records: getNumberOfMedicalRecords(allReports.data),
                medicalHistory: getNumberOfMedicalHistory(allMedicalHistory.data),
            }
        });

    } catch (error: any) {
        const err = errorHandler(error);
        res.status(err?.statusCode ?? 500).json(err);
    }
}

export {
    get_analytics
}

