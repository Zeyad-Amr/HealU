import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Define the interface for Patient
export interface Patient {
  PatientID: number;
  Illnesses: { IllnessDescription: string }[];
  Operations: { OperationName: string; OperationDate: string }[];
  MedicalTests: {TestID: number, TestDescription:string}[]; // Assuming this might vary in structure or is unknown
  Complaints: { ComplaintDescription: string }[];
  Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[];
}
// Define the initial state for patients
export interface PatientsState {
    patients: Patient[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  }
  
  const initialState: PatientsState = {
    patients: [],
    status: 'idle',
    error: null,
  };

// Define an async thunk to fetch patient data from the API
export const fetchPatientData = createAsyncThunk(
    'patient/fetchPatientData',
    async (_data: number, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get(`https://emr-sevice.onrender.com/medical-history/${_data}`);
            const patients: Patient[] = response.data;
            return patients;
        } catch (error) {
            return rejectWithValue("Failed to fetch patients");
        }
    });



// Create a slice for managing patient-related state
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatientData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.patients = action.payload;
      })
      .addCase(fetchPatientData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default patientSlice.reducer;

