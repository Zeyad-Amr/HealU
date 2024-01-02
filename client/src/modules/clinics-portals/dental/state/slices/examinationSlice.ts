import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../../../../core/api/api";

interface Doctor {
  userId: number;
  firstName: string;
  lastName: string;
  ////////////////////////////////
  // not used
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  role?: string;
  ssn: string;
  password: string;
  userName: string;
  insurancePersentage: null;
  emergencyContactName: null;
  emergencyContactNumber: null;
  specialization: string;
  clinicId: number;
  createdAt: string;
}

interface Patient {
  userId: number;
  ////////////////////////////////
  // personal data
  firstName: string;
  lastName: string;
  dateOfBirth: string; // use it to calculate age
  ////////////////////////////////
  // not used
  gender: string;
  email: string;
  phoneNumber: string;
  role?: string;
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

interface PatientRecord {
  RecordID: number;
  PatientID: number;
  AppointmentID: string;
  ClinicID: number;
  ////////////////////////////////
  // personal data
  PatientWeight: number;
  PatientHeight: number;
  ////////////////////////////////
  // not used
  Services: { ServicesDescription: string }[];
  RecommendedAction: { RecommendedActionDescription: string }[];
  RecordDate: string;
  CreatedAt: string;
  ////////////////////////////////
  // our clinical doesn't have them
  Vital: { VitalDescription: string }[];
  Vaccines: { VaccinesDescription: string }[];
  EyeMeasurement: { EyeMeasurementDescription: string }[];
  Nutrition: { NutritionDescription: string }[];
}

interface MedicalHistory {
  PatientID: number;
  ////////////////////////////////
  // history
  Illnesses: { IllnessDescription: string }[];
  Operations: { OperationName: string; OperationDate: string }[]; //services  // history and use in services form
  MedicalTests: { TestDescription: string }[]; // history and use in test form
  Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[];
}

export interface Examination {
  doctor: Doctor;
  patient: Patient;
  patientRecord: PatientRecord[];
  medicalHistory: MedicalHistory;
}

export interface ExaminationState {
  examination: Examination;
  loading: boolean;
  error: string;
}

const initialState: ExaminationState = {
  examination: {} as Examination,
  loading: false,
  error: "",
};

// Create an async thunk for fetching appointments
export const fetchExaminationByAppointmentID = createAsyncThunk(
  "examination/fetchExaminationByAppointmentID",
  async (AppointmentID: string) => {
    try {
      const response = await axios.get(`/appointment/${AppointmentID}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const ExaminationSlice = createSlice({
  name: "examination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExaminationByAppointmentID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExaminationByAppointmentID.fulfilled, (state, action) => {
        state.loading = false;
        state.examination = action.payload;
      })
      .addCase(fetchExaminationByAppointmentID.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch examination data";
      });
  },
});

export default ExaminationSlice.reducer;
