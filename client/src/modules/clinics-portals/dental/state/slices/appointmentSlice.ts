import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../../../../core/api/api";
import dayjs from "dayjs";

let doctorId: number = 1;

export interface Appointment {
  _id: string;
  slotId: string;
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

// Create an async thunk for fetching appointments
export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async () => {
    try {
      const response = await axios.get(
        `https://appointment-service-y30u.onrender.com/appointments/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for cancling appointment
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
        state.error = `Error canceling appointment: ${action.error.message}`;
      });

    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        state.appointments = state.appointments.filter((appointment) => {
          const currentDate = dayjs(); // Get the current date and time
          const nextWeekDate = currentDate.add(7, "days"); // Get the date 7 days from now
          const appointmentDate = dayjs(appointment.date, {
            format: "YYYY-MM-DD",
          });
          return (
            appointmentDate.isAfter(currentDate) &&
            appointmentDate.isBefore(nextWeekDate) &&
            appointment.doctorId === doctorId
          );
        });

        // state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error fetching appointments`;
      });
  },
});

// Export the reducer
export default appointmentSlice.reducer;
