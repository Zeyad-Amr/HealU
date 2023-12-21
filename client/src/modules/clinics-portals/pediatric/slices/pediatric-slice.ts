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


export interface device{
    DeviceName: string;
    DeviceType: string;
    DeviceManufacturer: string;
    PurchaseDate: string;
    ExpiryDate: string;
    DeviceStatus: string;
}

export interface AllDevices { 
    DeviceID: number;
    Device: device[];
}

export interface DeviceState { 
    AllDevices: AllDevices[];
    loading: boolean;
    error: string;
}


const initialState: DeviceState = {
    AllDevices: [],
    loading: false,
    error: ''
}


export const fetchDevices = createAsyncThunk(
    'devices/fetchDevices',
    async (_data: AllDevices[], thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get('https://5zd4y.wiremockapi.cloud/json/1');
            const devices: AllDevices[] = response.data;
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
            const devices: AllDevices[] = response.data;
            return devices;
        } catch (error) {
            return rejectWithValue("Failed to fetch devices");
        }
    }
);


const deviceSlice = createSlice({
    name:"devices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDevices.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDevices.fulfilled, (state, action) => {
            state.AllDevices = action.payload;
            state.loading = false;
            state.error = '';
        });
        builder.addCase(fetchDevices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});
export default deviceSlice.reducer;
