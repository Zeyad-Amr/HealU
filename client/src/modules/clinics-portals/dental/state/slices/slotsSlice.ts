import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../../core/api/api";
import { Appointment } from "./appointmentSlice";

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
    const response = await axios.get(`appointment/slots/`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create an async thunk for creating a new slot for the doctor
export const createSlotForDoctor = createAsyncThunk(
  "slot/createSlot",
  async ({
    time,
    weekDay,
    doctorId,
  }: {
    time: string;
    weekDay: string;
    doctorId: number;
  }) => {
    try {
      const res = await axios.post(`/appointment/slots/`, {
        doctorId: doctorId,
        time: time,
        weekDay: weekDay,
      });
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
      await axios.delete(`/appointment/slots/${slotId}`);
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
    // ///////////////////////////////////////////////////////////////

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
  },
});

// Export the reducer
export default slotSlice.reducer;
