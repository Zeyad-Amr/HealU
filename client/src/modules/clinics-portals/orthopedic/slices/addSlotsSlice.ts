/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "./patientSlice";
import api from "../../../../core/api/api";

export default interface Slot {
  _id?: string;
  patientFirstName?: string;
  doctorId: number;
  clinicId: number;
  patientId?: number;
  weekDay: string;
  time: string | null;
  slotId?: string | undefined;
}

// {
//   "doctorId": 2,
//   "clinicId": 3,
//   "time": "21:00",
//   "weekDay": "Sunday"
// }

interface SlotsState {
  slots: Slot[];
  selectedDate: string | null;
  slotsLength: number;
  isVisible: boolean;
}

const initialStateSlots: SlotsState = {
  slots: [],
  selectedDate: null,
  slotsLength: 0,
  isVisible: false,
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
  async (data: Slot, thunkAPI) => {
    const { time, weekDay } = data;

    // Check for empty strings
    if (!time || !weekDay) {
      return thunkAPI.rejectWithValue({
        message: "Time and date are required fields.",
      });
    }

    try {
      const response = await api.post<Slot>("/appointment/slots", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateSlot = createAsyncThunk(
  "slots/updateSlot",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.patch<Slot>(`/appointment/slots/${id}`, {
        patient: "   ",
      });
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
          const patientId = slot.appointmentObject?.patient?.userId ?? "";
          const patientFirstName =
            slot.appointmentObject?.patient?.firstName ?? "";
          const time = slot.slot.time;
          const slotId = slot.slot._id;
          console.log("rrrr", time);
          return {
            patientId,
            patientFirstName,
            time,
            slotId,
          };
        });
        return slotData;
      }
      // console.log(slotData);

      // const userIds = slots.map(
      //   (slot: any) => slot.appointmentObject?.patient?.userId ?? ""
      // );
      // console.log(userIds);
      // const time = slots.map((slot: any) => slot.time);
      // const firstName = slots.map((slot: any) => {
      //   const userId = slot.appointmentObject?.patient?.userId;
      //   const patientFirstName = slot.appointmentObject?.patient?.firstName;

      //   return userId !== undefined ? patientFirstName : " ";
      // });
    } catch (error: any) {
      console.error(error);
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteSlot = createAsyncThunk<Slot[], string>(
  "slots/deleteSlot",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await api.delete<Slot[]>(`appointment/slots/${id}`);
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
    builder.addCase(addSlot.pending, (state, action) => {
      console.log(action.meta.arg);
    });
    builder.addCase(addSlot.fulfilled, (state, action) => {
      console.log(action.payload);
      const newSlot = action.payload;
      if (state.selectedDate === newSlot.weekDay) {
        state.slots.push(newSlot);
      }
    });
    builder.addCase(getSlots.rejected, (state, action) => {
      console.log(action.payload);
      state.slots = [];
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

    builder.addCase(addSlot.rejected, (state, action) => {
      const errorMessage = action.payload
        ? action.payload
        : "An error occurred.";
      console.log(errorMessage);
    });
    builder.addCase(deleteSlot.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const addSlotReducers = addSlotSlice.reducer;
export const addSlotActions = addSlotSlice.actions;
