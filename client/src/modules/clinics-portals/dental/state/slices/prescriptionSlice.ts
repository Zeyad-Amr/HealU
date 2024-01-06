import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// used to submit diagnosis and prescription 
export interface Prescription { 
  AppointmentID: number;
  Diagnosis: string; // in Diagnosis
  ExtraNotes: string; // notes in prescription form
  Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[]; // in Prescription form
}

export interface PrescriptionState {
  prescription: Prescription | null;
  loading: boolean;
  error: string;
}

const initialState: PrescriptionState = {
  prescription: null,
  loading: false,
  error: "",
};

// Create an async thunk for creating a submit prescription by the doctor for appointment
export const createPrescriptionForAppointment = createAsyncThunk(
  "prescription/createPrescriptionForAppointment",
  async (newPrescription: Prescription) => {
    try {
      await axios.post(
        // `https://healu-api-gateway.onrender.com/api/emr/prescription`,
        `https://emr-sevice.onrender.com/prescription`,
        {
          AppointmentID: newPrescription.AppointmentID,
          Diagnosis: newPrescription.Diagnosis,
          ExtraNotes: newPrescription.ExtraNotes,
          Drugs: newPrescription.Drugs,
        }
      );
      return newPrescription;
    } catch (error) {
      throw error;
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrescriptionForAppointment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPrescriptionForAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.prescription = action.payload;
      })
      .addCase(createPrescriptionForAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          `Error fetching createPrescriptionForAppointment`; // return error message from server or default error message
      });
  },
});

// Export the reducer
export default prescriptionSlice.reducer;
