import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// show the history box
export interface History {
  PatientID: number;
  // history
  Illnesses: { IllnessDescription: string }[];
  Operations: { OperationName: string; OperationDate: string }[]; //services  // history and use in services form
  MedicalTests: { TestDescription: string }[]; // history and use in test form
  Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[];
  ////////////////////////////////
  Complaints: { ComplaintDescription: string }[]; // not used
}

export interface HistoryState {
  history: History | null;
  loading: boolean;
  error: string;
}

const initialState: HistoryState = {
  history: null,
  loading: false,
  error: "",
};

// Create an async thunk for fetch history for the patient history box
export const fetchHistoryByPatientID = createAsyncThunk(
  "history/fetchHistoryByID",
  async (patientId: number) => {
    try {
      const response = await axios.get(
        // `https://healu-api-gateway.onrender.com/api/emr/medical-history/${patientId}`
        `https://emr-sevice.onrender.com/medical-history/${patientId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryByPatientID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryByPatientID.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistoryByPatientID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || `Error fetching fetchHistoryByPatientID`; // return error message from server or default error message
      });
  },
});

// Export the reducer
export default historySlice.reducer;
