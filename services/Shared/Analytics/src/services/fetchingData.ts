import axios from "axios";
import { IRequest, RequestsDataMap } from "../models/request";

export const fetchData = async (): Promise<RequestsDataMap> => {
    const requests: IRequest[] = [
        {
            service: "Admin",
            url: `${process.env.Admin_URL}/api/v1/clinic`,
            api: 'GET /api/v1/clinic',
        },
        {
            service: "Admin",
            url: `${process.env.Admin_URL}/api/v1/clinicService`,
            api: 'GET /api/v1/clinicService',
        },
        {
            service: "Appointments",
            url: `${process.env.Appointment_URL}/appointments`,
            api: 'GET /appointments',
        },
        {
            service: "Registration",
            url: `${process.env.Registration_URL}/staff`,
            api: 'GET /staff',
        },
        {
            service: "Registration",
            url: `${process.env.Registration_URL}/user`,
            api: 'GET /user',
        },
        {
            service: "Storage",
            url: `${process.env.Storage_URL}/api/v1/images`,
            api: 'GET /api/v1/images',
        },
        {
            service: "Storage",
            url: `${process.env.Storage_URL}/api/v1/files`,
            api: 'GET /api/v1/files',
        },
        {
            service: "EMR",
            url: `${process.env.EMR_URL}/prescription`,
            api: 'GET /prescription',
        },
        {
            service: "EMR",
            url: `${process.env.EMR_URL}/record`,
            api: 'GET /record',
        },
        {
            service: "EMR",
            url: `${process.env.EMR_URL}/medical-history`,
            api: 'GET /medical-history',
        },
        {
            service: "Billing",
            url: `${process.env.Bill_URL}/bills`,
            api: 'GET /bills',
        },
        {
            service: "Billing",
            url: `${process.env.Bill_URL}/invoices`,
            api: 'GET /invoices',
        },
    ];

    const data: RequestsDataMap = {
        allClinicsRes: null,
        allServicesRes: null,
        allAppointments: null,
        allStaffsRef: null,
        allUsersRef: null,
        allImagesRef: null,
        allFilesRef: null,
        allPrescriptionsRef: null,
        allRecordsRef: null,
        allMedicalHistoryRef: null,
        allBillsRef: null,
        allInvoicesRef: null,
        errors: [],
    };

    const variableNames: (keyof RequestsDataMap)[] = Object.keys(data) as (keyof RequestsDataMap)[];

    const errors: string[] = []

    const results = await Promise.allSettled(
        requests.map(request => axios.get(request.url))
    );

    results.forEach((result, index) => {
        const variableName: keyof RequestsDataMap = variableNames[index] as keyof RequestsDataMap;
        if (result.status === 'fulfilled') {
            // console.log(requests[index]?.service, result.value.data);
            data[variableName] = result.value.data;
            // console.log(data[variableName]);
        } else {
            const error: string = `${requests[index]?.service} Service - ${requests[index]?.url}: ${result.reason?.message}`;
            errors.push(error);
            data[variableName] = null;
        }
    });

    data['errors'] = errors;
    return data;
}