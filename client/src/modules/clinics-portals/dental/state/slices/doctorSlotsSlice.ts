import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../../core/api/api";
import { Appointment } from "./appointmentSlice";
import dayjs from "dayjs";
import { Slot } from "./slotsSlice";

export interface DoctorSlotState {
  slots: Array<{ slot: Slot; appointmentObject: Appointment }>;
  loading: boolean;
  error: string;
}

const initialState: DoctorSlotState = {
  slots: [],
  loading: false,
  error: "",
};

export const fetchLoggedInDoctorSlots = createAsyncThunk(
  "doctorSlots/fetchLoggedInDoctorSlots",
  async (weekDay: number) => {
    try {
      const date = () => {
        const today = dayjs();
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
          const daysUntilNextSelectedDay = (i - today.day() + 7) % 7;
          const nextSelectedDay = today.add(daysUntilNextSelectedDay, "days");
          weekDates.push(nextSelectedDay.format("YYYY-MM-DD"));
        }
        return weekDates;
      };

      const response = await axios.get(`data/slots/${date()[weekDay]}`);
      return response.data["slots"];
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for creating a new slot for the doctor
export const createSlotForLoggedInDoctor = createAsyncThunk(
  "doctorSlots/createSlotForLoggedInDoctor",
  async ({ time, weekDay }: { time: string; weekDay: string }) => {
    try {
      const response = await axios.post(`/data/slots`, {
        time: time,
        weekDay: weekDay,
      });
      return { time: time, weekDay: weekDay };
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for fetching slots for doctors
export const deleteSlot = createAsyncThunk(
  "doctorSlots/deleteSlot",
  async (slotId: string) => {
    try {
      await axios.delete(`/appointment/slots/${slotId}`);
      return slotId;
    } catch (error) {
      throw error;
    }
  }
);

// Create an async thunk for cancling appointment
export const cancelAppointment = createAsyncThunk(
  "doctorSlots/cancelAppointment",
  async (appointmentId: string) => {
    try {
      await axios.delete(`/appointment/${appointmentId}`);
      return appointmentId;
    } catch (error) {
      throw error;
    }
  }
);

const doctorSlotsSlice = createSlice({
  name: "doctorSlots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSlotForLoggedInDoctor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSlotForLoggedInDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = [
          ...state.slots,
          {
            slot: {
              time: action.payload["time"],
              weekDay: action.payload["weekDay"],
              doctorId: 63,
            },
            appointmentObject: {} as Appointment,
          },
        ];
      })
      .addCase(createSlotForLoggedInDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error deleting slot: ${action.error.message}`;
      });
    ///////////////////////////////////////////////////////////////

    builder
      .addCase(fetchLoggedInDoctorSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInDoctorSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchLoggedInDoctorSlots.rejected, (state, action) => {
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
        state.slots = state.slots.filter(
          (slot) => slot.slot._id !== action.payload
        );
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error deleting slot: ${action.error.message}`;
      });
    ///////////////////////////////////////////////////////////////
    builder
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const canceledSlotId = action.payload;

        // Find the slot to replace or default to an empty object
        const newSlot = state.slots.find(
          (slot) => slot.appointmentObject._id === canceledSlotId
        ) ?? { slot: {} };

        // Remove the canceled slot from the array
        state.slots = state.slots.filter(
          (slot) => slot.appointmentObject._id !== canceledSlotId
        );

        // Add the new slot to the array
        state.slots = [
          ...state.slots,
          { slot: newSlot.slot as Slot, appointmentObject: {} as Appointment },
        ];
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = `Error canceling appointment: ${action.error.message}`;
      });
  },
});

// Export the reducer
export default doctorSlotsSlice.reducer;
