import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface patientType{
    id: number;
    name: string;
}

export interface Schedule{
    id: number;
    Patient: patientType;
    date: string;
    time: string;
    status: string;
}
export interface Drug { 
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
}
export interface Eprescription { 
    id: number;
    patient: patientType;
    drugs: Drug[];
    
}
export interface device{
    id: number;
    name: string;
    deviceType: string;
    manufacturer: string;
    model: string;
    pruchaseDate: string;
    expiryDate: string;
    status: string;
}
export interface VitalSingns { 
    date: string;
    time: string;
    temperature: number;
    bloodPressure?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    Height: number;
    Weight: number;
    notes?: string;
}
export interface Diagnosis {
    Diagnoses: string;
    VitalSingns: VitalSingns;
    Eprescription?: Eprescription;
    
}
export interface Record { 
    id: number;
    patient: patientType;
    Diagnosis: Diagnosis[];
}
export interface ScheduleState { 
    schedules: Schedule[];
    loading: boolean;
    error: string;
}
export interface deviceState { 
    devices: device[];
    loading: boolean;
    error: string;
}

const ScheduleInitialState: ScheduleState = {
    schedules: [],
    loading: false,
    error: ''
}
const initialStateDevice: deviceState = {
    devices: [],
    loading: false,
    error: ''
}
export const fetchSchedule = createAsyncThunk(
    'schedule/fetchSchedule',
    async (_data: Schedule, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get('http://localhost:5000/api/schedule');
            const schedules: Schedule[] = response.data;
            return schedules;
        } catch (error) {
            return rejectWithValue("Failed to fetch schedule");
        }
    });

export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async (_data: device, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get('http://localhost:5000/api/devices');
            const devices: device[] = response.data;
            return devices;
        } catch (error) {
            return rejectWithValue("Failed to fetch devices");
        }
    });
export const AddDevice = createAsyncThunk(
    'devices/AddDevice',
    async (data: device, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.post('http://localhost:5000/api/devices',data);
            const devices: device[] = response.data;
            return devices;
        } catch (error) {
            return rejectWithValue("Failed to fetch devices");
        }
    }
);

const scheduleSlice = createSlice({
    name: 'schedules',
    ScheduleInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSchedule.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.loading = false;
            state.error = '';
        });
        builder.addCase(fetchSchedule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});
const deviceSlice = createSlice({
    name: 'devices',
    initialStateDevice,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDevices.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDevices.fulfilled, (state, action) => {
            state.devices = action.payload;
            state.loading = false;
            state.error = '';
        });
        builder.addCase(fetchDevices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

