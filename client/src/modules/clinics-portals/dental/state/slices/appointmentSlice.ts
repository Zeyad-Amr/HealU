import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Appointment {
  _id: string;
  slotId: number;
  patientId: number;
  doctorId: number;
  clinicId: number;
  status: string;
  date: string;
  time: string;
}

export interface AppointmentState {
  appointments: Array<Appointment>;
  loading: boolean;
  error: string;
}

const initialState: AppointmentState = {
  appointments: [] as Array<Appointment>,
  loading: false,
  error: "",
};

// Create an async thunk for fetching slots for doctors
export const cancelAppointment = createAsyncThunk(
  "appointment/cancelAppointment",
  async (appointmentId: string) => {
    try {
      await axios.delete(
        `https://appointment-service-y30u.onrender.com/appointments/${appointmentId}`
      );
      return appointmentId;
    } catch (error) {
      throw error;
    }
  }
);

// Create the slot slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error deleting slot: ${action.error.message}`;
      });
  },
});

// Export the reducer
export default appointmentSlice.reducer;
