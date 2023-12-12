/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { patient } from "./patientSlice";

interface schedule {
  scheduleId: number;
  patient: patient;
  date: string;
  status: boolean;
}
const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    axios
      .put("", {
        scheduleId: 1,
        patient: { patientId: 1, patientName: "onepatient" },
        date: "today",
        status: true,
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.message));
  }
);

const initialStateSchedule: schedule = {
  scheduleId: NaN,
  patient: { patientId: 0, patientName: "" },
  date: "",
  status: false,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialStateSchedule,
  reducers: {},
});

export const scheduleReducers = scheduleSlice.reducer;
export const scheduleActions = scheduleSlice.actions;

