import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// used for show length, weight in patient info box and submit services and tests
export interface Record {
  AppointmentID: number;
  // patient information
  Weight: number;
  Length: number;
  ////////////////////////////////

  // services and test form
  Services: { ServicesDescription: string}[]; // service submission description
  RecommendedAction: { RecommendedActionDescription: string}[]; // test submission description
  ////////////////////////////////

  // not used
  Vital: { VitalDescription: string }[];
  DiagnosisDescription: string;
}

export interface RecordState {
  record: Record | null;
  loading: boolean;
  error: string;
}

const initialState: RecordState = {
  record: null,
  loading: false,
  error: "",
};

// Create an async thunk for fetch record for the patient info box
export const fetchRecordByPatientID = createAsyncThunk(
    "record/fetchRecordByID",
    async (patientId: number) => {
      try {
        const response = await axios.get(
          `https://healu-api-gateway.onrender.com/api/emr/record/patient/${patientId}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );


// Create an async thunk for creating a submit test and serves by the doctor for appointment
export const createRecordForAppointment = createAsyncThunk(
    "record/createRecordForAppointment",
    async (newRecord: Record) => {
      try {
        await axios.post(
          `https://healu-api-gateway.onrender.com/api/emr/record`,
          {
            AppointmentID: newRecord.AppointmentID,
            Services: newRecord.Services,
            RecommendedAction: newRecord.RecommendedAction,
          }
        );
        return newRecord;
      } catch (error) {
        throw error;
      }
    }
  );

  const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createRecordForAppointment.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(createRecordForAppointment.fulfilled, (state, action) => {
          state.loading = false;
          state.record = action.payload;
        })
        .addCase(createRecordForAppointment.rejected, (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            `Error fetching createRecordForAppointment`; // return error message from server or default error message
        });

        ////////////////////////////////

        builder
        .addCase(fetchRecordByPatientID.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchRecordByPatientID.fulfilled, (state, action) => {
          state.loading = false;
          state.record = action.payload;
        })
        .addCase(fetchRecordByPatientID.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || `Error fetching fetchRecordByPatientID`; // return error message from server or default error message
        });
    },
  });
  
  // Export the reducer
  export default recordSlice.reducer;