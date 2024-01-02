import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../../core/api/api";

export interface Patient {
  userId: number;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: number;
  role: string;
  ssn: number;
  password: string;
  userName: string;
  insurancePersentage: number;
  emergencyContactName: string;
  emergencyContactNumber: number;
  specialization: null;
  clinicId: null;
}

export interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string;
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: "",
};

// Create an async thunk for fetching appointments
export const fetchPatients = createAsyncThunk(
  "patient/fetchPatients",
  async () => {
    try {
      const response = await axios.get(`/registration/user`);
      return response.data["data"];
    } catch (error) {
      throw error;
    }
  }
);

const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch examination data";
      });
  },
});

export default PatientSlice.reducer;
