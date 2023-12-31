import { Request, Response } from 'express';
import axios from 'axios';
import { errorHandler } from '../services/errorHandler';
import { getNumberOfClinics, getNumberOfServices } from '../services/adminService';
import { getNumberOfAppointments } from '../services/appointmentsService';
import { getNumberOfDoctors, getNumberOfPatients } from '../services/registrationService';
import { getNumberOfDocuments } from '../services/storageService';
import { getNumberOfMedicalHistory, getNumberOfMedicalRecords, getNumberOfPrescriptions } from '../services/emrService';
import { fetchData } from '../services/fetchingData';
import { getNumberOfBills, getNumberOfInvoices } from '../services/billingService';

const get_analytics = async (req: Request, res: Response) => {
    try {
        console.log("Analytics service is called");

        //* Fetching Data from services
        const {
            allClinicsRes,
            allServicesRes,
            allAppointments,
            allStaffsRef,
            allUsersRef,
            allImagesRef,
            allFilesRef,
            allPrescriptionsRef,
            allRecordsRef,
            allMedicalHistoryRef,
            allBillsRef,
            allInvoicesRef,
            errors,
        } = await fetchData();
        console.log(allBillsRef);
        //* Processing Data
        const processedData = {
            clinics: getNumberOfClinics(allClinicsRes?.data.clinics ?? []),
            services: getNumberOfServices(allServicesRes?.data.clinicServices ?? []),
            appointments: getNumberOfAppointments(allAppointments ?? []),
            doctors: getNumberOfDoctors(allStaffsRef?.data ?? []),
            patients: getNumberOfPatients(allUsersRef?.data ?? []),
            documents: getNumberOfDocuments(
                allImagesRef?.data?.images ?? [],
                allFilesRef?.data?.files ?? []
            ),
            prescriptions: getNumberOfPrescriptions(allPrescriptionsRef ?? []),
            records: getNumberOfMedicalRecords(allRecordsRef ?? []),
            medicalHistory: getNumberOfMedicalHistory(allMedicalHistoryRef ?? []),
            bills: getNumberOfBills(allBillsRef ?? [],),
            invoices: getNumberOfInvoices(allInvoicesRef ?? [],),

            errors: errors,
        };

        //* Sending Response
        return res.status(200).json({
            status: 'success',
            message: 'Analytics data fetched successfully',
            processedData,
        });

    } catch (error: any) {
        const err = errorHandler(error);
        res.status(err?.statusCode ?? 500).json(err);
    }
};

export {
    get_analytics
};
