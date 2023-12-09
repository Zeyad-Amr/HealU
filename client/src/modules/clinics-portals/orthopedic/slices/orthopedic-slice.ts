/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface patient {
  id: number;
  name: string;
}

export interface supplies {
  name: string;
  quantity: number;
  supplier: string;
}

export interface schedule {
  scheduleId: any;
  patients: patient;
  date: string;
  time: string;
  status: boolean;
}

export interface Drug {
  name: string;
  dosage: string;
  perDay: number;
  duration: string;
  notes?: string;
}

const initialStatePatients: PatientsState = {
  patients: [],
  status: "idle",
  error: null,
};

interface PatientsState {
  patients: patient[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialStateSchedules: SchedulesState = {
  schedules: [],
  status: "idle",
  error: null,
};

interface SchedulesState {
  schedules: schedule[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const scheduleSlice = createSlice({
  name: "schedules",
  initialState: initialStateSchedules,
  reducers: {},
});

const patientSlice = createSlice({
  name: "patients",
  initialState: initialStatePatients,
  reducers: {},
});

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    try {
      const response = await axios.get("https://api.example.com/patients");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "schedules/updateSchedule",
  async ({
    scheduleId,
    updatedSchedule,
  }: {
    scheduleId: number;
    updatedSchedule: Partial<schedule>;
  }) => {
    try {
      const response = await axios.put(
        `https://api.example.com/schedules/${scheduleId}`,
        updatedSchedule
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
