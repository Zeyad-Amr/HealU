import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./../../../../core/api/api";

export interface Slot {
  _id: string;
  doctorId: number;
  clinicId: number;
  time: string;
  weekDay: string;
  __v: number;
}

export interface appointmentObject {
  _id: string;
  slotId: string;
  patientId: number;
  doctorId: number;
  clinicId: number;
  status: string;
  date: Date;
  time: string;
  __v: number;
  patient: any;
}
export interface AllSlots {
  slot: Slot;
  appointmentObject: appointmentObject;
}
export interface SlotData {
  slots: AllSlots[];
}
export interface SlotsState {
  allSlots: SlotData;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: SlotsState = {
  allSlots: {} as SlotData,
  status: "idle",
  error: null,
};

export const fetchSlotsData = createAsyncThunk(
  "slots/fetchSlotsData",
  async (_data: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        `https://healu-api-gateway.onrender.com/api/data/slots/${_data}`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNDIxNzA5Mn0.VrFVdk_9qHI_xQmqO0-l4OalNKq0ldlNdiP36OEeBP4",
          },
        }
      );
      const slots: SlotData = response.data;
      return slots;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch slots");
    }
  }
);
export const deleteSlot = createAsyncThunk(
  "slots/deleteSlot",
  async (slotId: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.delete(
        `https://healu-api-gateway.onrender.com/api/appointment/slots/${slotId}`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
          },
        }
      );
      console.log(response);
      return slotId;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to delete slot");
    }
  }
);

export const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSlotsData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSlotsData.fulfilled, (state, action) => {
      state.status = "idle";
      state.allSlots = action.payload;
    });
    builder.addCase(fetchSlotsData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      state.allSlots = {} as SlotData;
    });
    builder.addCase(deleteSlot.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteSlot.fulfilled, (state, action) => {
      state.status = "idle";
      state.allSlots = {
        ...state.allSlots,
        slots: state.allSlots.slots.filter(
          (slot) => slot.slot._id !== action.payload
        ),
      };
    });
    builder.addCase(deleteSlot.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  },
});

export default slotsSlice.reducer;
