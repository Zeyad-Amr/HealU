/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "./patientSlice";

export default interface Schedule {
  scheduleId: number;
  patient: Patient;
  date: string;
  doctorName: string;
}
interface ScheduleState {
  schedules: Schedule[];
}

const initialStateSchedule: ScheduleState={
  schedules:[]
}

export const getSchedules = createAsyncThunk(
  "schedule/getSchedules",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Schedule[]>("http://localhost:3003/schedules");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    axios
      .put("", {
        scheduleId: 1,
        patient: { patientId: 1, patientName: "onepatient" },
        date: "21-1",
        status: true,
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.message));
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialStateSchedule,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchedules.pending, (state, action) => {
      console.log(state)
    });
    builder.addCase(
      getSchedules.fulfilled,
      (state, action: PayloadAction<Schedule[] | void>) => {
        if (action.payload) {
          console.log(action.payload);
          return { ...state, schedules: action.payload };
          
        } else {
          console.log("failed");
          return state;
        }
      }
    );
  },
});

export const scheduleReducers = scheduleSlice.reducer;
export const scheduleActions = scheduleSlice.actions;
