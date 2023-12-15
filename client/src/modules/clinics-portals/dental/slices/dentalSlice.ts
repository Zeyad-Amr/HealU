import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// interfaces
export interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
}

export interface Doctor extends Patient{
    specialization: string;
}

export interface Schedule {
  scheduleId: number;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  status: string;
}

export interface Procedure{
    procedureId: number;
    name: string;
    doctor: Doctor;
    description: string;
    duration: number; // in minutes
    cost: number; // in currency
}

export interface Diagnoses {
  diagnoses: string;
}

export interface Drug {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
}

export interface Record {
  recordId: number;
  patient: Patient;
  schedules: Schedule[];
  procedures: Procedure[];
  Diagnoses: Diagnoses[];
  Drugs: Drug[];
}



interface DentalState {
  patients: Patient[];
  doctors: Doctor[];
  schedules: Schedule[];
  records: Record[];
  procedures: Procedure[];
  drugs: Drug[];
  loading: boolean;
  error: string | null;
}

const initialState: DentalState = {
  patients: [],
  doctors: [],
  schedules: [],
  records: [],
  procedures: [],
  drugs: [],
  loading: false,
  error: null,
};

// create Async functions
export const fetchPatients = createAsyncThunk(
    'dentalPortal/fetchPatients', 
    async (_,thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get('http://localhost:5000/dentalPortal');
            const patients: Patient[] = await response.data;
            return patients;
        } catch (error) {
            return rejectWithValue("Failed to fetch Patients'data");
        }
});

export const insertPatient = createAsyncThunk(
    'dentalPortal/insertPatient', 
    async (data: Patient,thunkApi) => {
        const { rejectWithValue, getState } = thunkApi;
        try {
            await axios.post('http://localhost:5000/dentalPortal',data);
            return data;
        } catch (error) {
            return rejectWithValue(`Failed to insert Patient ${data.id}`);
        }
});

export const deletePatient = createAsyncThunk(
    'dentalPortal/deletePatient', 
    async (data: Patient,thunkApi) => {
        const { rejectWithValue, getState } = thunkApi;
        try {
            await axios.delete('http://localhost:5000/dentalPortal',data.id);
            // dispatch(fetchPatients());
            return data;
        } catch (error) {
        return rejectWithValue(`Failed to delete Patient ${data.id}`);
        }
});

// create dental portal slice
export const dentalPortalSlice = createSlice({
  name: 'dentalPortal',
  initialState,
  reducers: {
    fetchPatients(state,action){
        state.patients.get(action.payload);
    },
    insertPatient(state,action){
        state.patient.push(action.payload);
    },
    deletePatient(state,action){
        state.patient.delete(action.payload,1);
    },
    setLoading(state,action){
        state.loading = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state,action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
        state.error = null;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });

    builder
      .addCase(insertPatient.pending, (state,action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        state.patients.push(action.payload);
      })
      .addCase(insertPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });

    builder
      .addCase(deletePatient.pending, (state,action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });


  },
});

export default dentalPortalSlice.reducer;
