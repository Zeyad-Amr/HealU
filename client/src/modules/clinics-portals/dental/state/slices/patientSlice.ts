import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// show the name, age in patient info box
export interface Patient {
  // patient information
  patientId: number;
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
}

export interface PatientState {
  patient: Patient | null;
  loading: boolean;
  error: string;
}

const initialState: PatientState = {
  patient: null,
  loading: false,
  error: "",
};

// Create an async thunk for fetch patient for the patient info box
export const fetchPatientByID = createAsyncThunk(
  "patient/fetchPatientByID",
  async (patientId: number) => {
    try {
      const response = await axios.get(
        `https://healu-api-gateway.onrender.com/api/registration/patient/${patientId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatientByID.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(fetchPatientByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || `Error fetching fetchPatientByID`; // return error message from server or default error message
      });
  },
});

// Export the reducer
export default patientSlice.reducer;
