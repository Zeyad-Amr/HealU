/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "./patientSlice";
import api from "../../../../core/api/api";

export default interface Slot {
  _id?: string;
  patientFirstName?: string;
  doctorId?: number;
  clinicId?: number;
  patientId?: number;
  weekDay: string;
  time: string | null;
  slotId?: string | undefined;
  loading?: boolean;
}

interface SlotsState {
  slots: Slot[];
  selectedDate: string | null;
  slotsLength: number;
  isVisible: boolean;
  loading?: boolean;
}

const initialStateSlots: SlotsState = {
  slots: [],
  selectedDate: null,
  slotsLength: 0,
  isVisible: false,
  loading: false,
};

export const updateSlotStatus = createAsyncThunk(
  "slots/updateSlotStatus",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .patch<Slot>(`${api}/appointment/:appointmentId`, {
        status: 1,
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.message));
  }
);

export const addSlot = createAsyncThunk(
  "slots/addSlot",
  async ({
    time,
    weekDay,
  }: {
    time: string | null;
    weekDay: string;
  }) => {
    console.log(time, weekDay);
    try {
      const res = await api.post("/data/slots", {
        time: time,
        weekDay: weekDay,
      });
      return { time: time, weekDay: weekDay };

    } catch (error) {
      throw error;
    }
  }
);

export const updateSlot = createAsyncThunk(
  "slots/updateSlot",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete<Slot>(`/appointment/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getSlots = createAsyncThunk<Slot[], string | void>(
  "slots/getSlots",
  async (selectedDate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await api.get<any>(`/data/slots/${selectedDate}`);
      const slots = response.data.slots;
      if (slots.length === 0) {
        console.log(slots);
        return [];
      } else {
        const slotData = slots.map((slot: any) => {
          const appointmentObjectId = slot.appointmentObject?._id ?? "";
          const patientId = slot.appointmentObject?.patient?.userId ?? "";
          const patientFirstName =
            slot.appointmentObject?.patient?.firstName ?? "";
          const time = slot.slot.time;
          const slotId = slot.slot._id;
          return {
            appointmentObjectId,
            patientId,
            patientFirstName,
            time,
            slotId,
          };
        });
        return slotData;
      }
    } catch (error: any) {
      console.error(error);
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteSlotDoctor = createAsyncThunk<Slot[], any>(
  "slots/deleteSlotDoctor",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await api.delete<Slot[]>(`appointment/slots/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw rejectWithValue(error.message);
    }
  }
);

const addSlotSlice = createSlice({
  name: "slots",
  initialState: initialStateSlots,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setFormVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteSlotDoctor.pending, (state: any, action) => {
      state.loading = true;
    });

    builder.addCase(deleteSlotDoctor.fulfilled, (state: any, action) => {
      state.slots = state.slots.filter(
        (slot: any) => slot._id !== action.payload
      );
    });
    builder.addCase(deleteSlotDoctor.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addSlot.pending, (state, action) => {
      console.log(action.meta.arg);
    });
    builder.addCase(addSlot.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        const newSlot = action.payload as any; // Add type assertion here
        if (state.selectedDate === newSlot.weekDay) {
          state.slots.push(newSlot);
        }
      }
    });
    builder.addCase(addSlot.rejected, (state, action) => {
      console.log(action.payload);
      const errorMessage = action.payload
        ? action.payload
        : "An error occurred.";
      console.log(errorMessage);
    });
    builder.addCase(
      getSlots.fulfilled,
      (state: any, action: PayloadAction<Slot[] | undefined>) => {
        if (action.payload) {
          console.log(action.payload);
          if (action.payload.length !== 0) {
            state.slots = action.payload;
          }
        } else {
          console.log("failed");
          return state;
        }
      }
    );
    builder.addCase(getSlots.rejected, (state, action) => {
      console.log(action.payload);
      state.slots = [];
    });
  },
});

export const addSlotReducers = addSlotSlice.reducer;
export const addSlotActions = addSlotSlice.actions;
