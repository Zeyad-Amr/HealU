import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface OphthalmologyState {
  patients: {
    patientId: number;
    appointmentId: number;
    lt: {
      sph: number;
      cyl: number;
      axis: number;
    };
    rt: {
      sph: number;
      cyl: number;
      axis: number;
    };
  }[];
  loading: boolean;
  error: string;
}

const initialState: OphthalmologyState = {
  patients: [],
  loading: false,
  error: '',
};

export const fetchOphthalmologyData = createAsyncThunk(
  'ophthalmology/fetchOphthalmologyData',
  async (_data: void, { rejectWithValue }) => {
    try {
      const response = await axios.get('');
      const ophthalmologyData: OphthalmologyState['patients'] = response.data;
      return ophthalmologyData;
    } catch (error) {
      return rejectWithValue('Failed to fetch ophthalmology data');
    }
  }
);

const ophthalmologySlice = createSlice({
  name: 'ophthalmology',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOphthalmologyData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOphthalmologyData.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(fetchOphthalmologyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default ophthalmologySlice.reducer;
