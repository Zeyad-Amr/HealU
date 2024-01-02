import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "../../../../../core/api/api";
import { Appointment } from "./appointmentSlice";
import dayjs from "dayjs";

let doctorId: number = 1;

export interface Slot {
  _id?: string;
  doctorId: number;
  clinicId?: number;
  time: string;
  weekDay: string;
  appointment?: Appointment;
}

export interface SlotState {
  slots: Array<Slot>;
  loading: boolean;
  error: string;
}

const initialState: SlotState = {
  slots: [],
  loading: false,
  error: "",
};

// Create an async thunk for fetching slots for doctors
export const fetchSlots = createAsyncThunk("slot/fetchSlots", async () => {
  try {
    const response = await axios.get(
      `https://appointment-service-y30u.onrender.com/slots/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchSlotsForDoctor = createAsyncThunk(
  "slot/fetchDoctorSlots",
  async ({ doctorId, weekDay }: { doctorId: number; weekDay: number }) => {
    try {
      // Convert weekday to date string
      const date = dayjs().day(weekDay).format("YYYY-MM-DD");

      const response = await axios.get(
        `https://appointment-service-y30u.onrender.com/slots/doctor/${doctorId}/date/${date}`
      );

      // Map each item in the array to a Slot instance
      const slots: Slot[] = response.data.map((item: any) => ({
        doctorId: item.slot.doctorId,
        clinicId: item.slot.clinicId,
        time: item.slot.time,
        weekDay: item.slot.weekDay,
        _id: item.slot._id,
        appointment: item.appointmentObject, // Assuming appointmentObject is of type Appointment
      }));
      return { slots }; // Return an object
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for creating a new slot for the doctor
export const createSlotForDoctor = createAsyncThunk(
  "slot/createSlot",
  async ({ time, weekDay }: { time: string; weekDay: string }) => {
    try {
      const res = await axios.post(
        `https://appointment-service-y30u.onrender.com/slots/`,
        {
          doctorId: doctorId,
          time: time,
          weekDay: weekDay,
        }
      );
      return res.data["newSlot"];
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for fetching slots for doctors
export const deleteSlot = createAsyncThunk(
  "slot/deleteSlot",
  async (slotId: string) => {
    try {
      await axios.delete(
        `https://appointment-service-y30u.onrender.com/slots/${slotId}`
      );
      return slotId;
    } catch (error) {
      throw error;
    }
  }
);

// Create the slot slice
const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
        state.slots = state.slots.filter((slot) => slot.doctorId === doctorId);
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    ///////////////////////////////////////////////////////////////

    builder
      .addCase(deleteSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = state.slots.filter((slot) => slot._id !== action.payload);
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error deleting slot: ${action.error.message}`;
      });
    ///////////////////////////////////////////////////////////////

    builder
      .addCase(createSlotForDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSlotForDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = [...state.slots, action.payload];
      })
      .addCase(createSlotForDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error deleting slot: ${action.error.message}`;
      });
    ///////////////////////////////////////////////////////////////

    builder
      .addCase(fetchSlotsForDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSlotsForDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload.slots;
      })
      .addCase(fetchSlotsForDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer
export default slotSlice.reducer;
