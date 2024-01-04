import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export interface Schedule {
    PatientName: string;
    date: Date;
}
export interface ScheduleState {
    schedules: Schedule[];
    loading: boolean;
    error: string;
}


const ScheduleInitialState: ScheduleState = {
    schedules: [],
    loading: false,
    error: ''
}



export const fetchSchedule = createAsyncThunk(
    'schedule/fetchSchedule',
    async (_data: Schedule[], thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get('http://localhost:5000/api/schedule');
            const schedules: Schedule[] = response.data;
            return schedules;
        } catch (error) {
            return rejectWithValue("Failed to fetch schedule");
        }
    });

export const AddSchedule = createAsyncThunk(
    'schedule/AddSchedule',
    async (data: any, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.post('http://localhost:5000/api/schedule', data);
            const schedules: Schedule[] = response.data;
            return schedules;

        } catch (error) {
            return rejectWithValue("Failed to fetch schedule");
        }
    }

);

const scheduleSlice = createSlice({
    name: 'schedules',
    initialState: ScheduleInitialState,
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
        builder.addCase(AddSchedule.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(AddSchedule.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
        });
        builder.addCase(AddSchedule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});
export default scheduleSlice.reducer;