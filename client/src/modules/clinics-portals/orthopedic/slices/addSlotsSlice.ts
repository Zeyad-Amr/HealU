/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "./patientSlice";

export default interface Slot {
  patient?: Patient;
  date: string;
  time: string | null;
}
interface SlotsState {
  slots: Slot[];
  selectedDate: string | null; // Add selectedDate field
}

const initialStateSlots: SlotsState = {
  slots: [],
  selectedDate: null,
};

export const addSlot = createAsyncThunk(
  "slots/addSlot",
  async (data: Slot, thunkAPI) => {
    const { time, date } = data;

    // Check for empty strings
    if (!time || !date) {
      return thunkAPI.rejectWithValue({
        message: "Time and date are required fields.",
      });
    }

    try {
      const response = await axios.post<Slot>(
        "http://localhost:3003/slots",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const updateSlot = createAsyncThunk("slots/updateSlot", (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  axios
    .put("", {
      scheduleId: 1,
      patient: { patientId: 1, patientName: "onepatient" },
      date: "21-1",
      status: true,
    })
    .then((res) => res.data)
    .catch((error) => rejectWithValue(error.message));
});

export const getSlots = createAsyncThunk(
  "slots/getSlots",
  async (selectedDate: string | void, thunkAPI) => {
    try {
      const response = await axios.get<Slot[]>(
        `http://localhost:3003/slots?date=${selectedDate}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const deleteSlot = createAsyncThunk("slots/deleteSlot", (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  axios
    .put("", {
      scheduleId: 1,
      patient: { patientId: 1, patientName: "onepatient" },
      date: "21-1",
      status: true,
    })
    .then((res) => res.data)
    .catch((error) => rejectWithValue(error.message));
});

const addSlotSlice = createSlice({
  name: "slots",
  initialState: initialStateSlots,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSlot.pending, (state, action) => {
      console.log(action.meta.arg);
    });
    builder.addCase(addSlot.fulfilled, (state, action) => {
      console.log(action.payload);
      const newSlot = action.payload;
      if (state.selectedDate === newSlot.date) {
        state.slots.push(newSlot);
      }
    });
    builder.addCase(
      getSlots.fulfilled,
      (state, action: PayloadAction<Slot[] | undefined>) => {
        if (action.payload) {
          console.log(action.payload);
          state.slots = action.payload;
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
  },
});

export const addSlotReducers = addSlotSlice.reducer;
export const addSlotActions = addSlotSlice.actions;
