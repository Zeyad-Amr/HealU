import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./../../../../core/api/api";

export interface appointmentDoctor {
  userId: number;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  role: string;
  ssn: string;
  password: string;
  userName: string;
  insurancePersentage: null | number;
  emergencyContactName: null | string;
  emergencyContactNumber: null | string;
  specialization: string;
  clinicId: number;
  createdAt: string;
}

export interface appointmentPatient {
  userId: number;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  role: string;
  ssn: string;
  password: string;
  userName: string;
  insurancePersentage: number;
  emergencyContactName: string;
  emergencyContactNumber: string;
  specialization: null;
  clinicId: null;
  createdAt: string;
}

export interface appointmentRecommendedAction {
  RecommendedActionDescription: string;
}
export interface appointmentVital {
  BloodPressure: string;
  RespirationRate: string;
  HeartRate: string;
  DiabeticTest: string;
  SPO2: string;
}

export interface appointmentServices {
  ServicesDescription: string;
}

export interface appointmentNutrition {
  DietPlan: string;
  Inbody: string;
}

export interface appointmentVaccine {
  VaccineName: string;
  VaccineType: string;
  VaccineDate: string;
}

export interface appointmentEyeMeasurement {
  LeftEye: string;
  RightEye: string;
}

export interface appointmentPatientRecord {
  RecordID: number;
  PatientID: number;
  AppointmentID: string;
  ClinicID: number;
  RecordDate: string;
  PatientWeight: number;
  PatientHeight: number;
  CreatedAt: string;
  Services: appointmentServices[];
  RecommendedAction: appointmentRecommendedAction[];
  Vital: appointmentVital[];
  Vaccines: appointmentVaccine[];
  EyeMeasurement: appointmentEyeMeasurement[];
  Nutrition: appointmentNutrition[];
}

export interface appointmentMedicalHistory {
  PatientID: number;
  CreatedAt: string;
  Illnesses: any[]; // You may define a specific interface for illnesses if needed
  Operations: any[]; // You may define a specific interface for operations if needed
  MedicalTests: any[]; // You may define a specific interface for medical tests if needed
  Complaints: any[]; // You may define a specific interface for complaints if needed
  Drugs: {
    DrugName: string;
    DrugDuration: string;
    DrugDose: string;
  }[];
}

export interface appointmentData {
  doctor: appointmentDoctor;
  patient: appointmentPatient;
  patientRecord: appointmentPatientRecord[];
  medicalHistory: appointmentMedicalHistory;
  errors: any[]; // You may define a specific interface for errors if needed
}

export interface appointmentState {
  appointment: appointmentData;
  loading: boolean;
  error: string;
}

const initialState: appointmentState = {
  appointment: {} as appointmentData,
  loading: false,
  error: "",
};

export const getAllAppointmentData = createAsyncThunk(
  "appointment/getAppointment",
  async (data: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await api.get(`/data/appointment/${data}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to get appointment");
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAppointmentData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllAppointmentData.fulfilled, (state, action) => {
      state.loading = false;
      state.appointment = action.payload;
    });
    builder.addCase(getAllAppointmentData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default appointmentSlice.reducer;
