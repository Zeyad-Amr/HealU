export default interface UserModel {
    userId?: number;
    gender: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    role?: string;
    ssn: string;
    userName: string;
    password?: string;
    insurancePersentage?: number;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    specialization?: string;
    clinicId?: number;
    createdAt?: string;
}

