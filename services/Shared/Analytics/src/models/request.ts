export interface IRequest {
    url: string;
    service: string;
    api: string;
}

export interface RequestsDataMap {
    allClinicsRes?: any;
    allServicesRes?: any;
    allAppointments?: any;
    allStaffsRef?: any;
    allUsersRef?: any;
    allImagesRef?: any;
    allFilesRef?: any;
    allPrescriptionsRef?: any;
    allRecordsRef?: any;
    allMedicalHistoryRef?: any;
    allBillsRef?: any;
    allInvoicesRef?: any;
    errors?: string[];
}
