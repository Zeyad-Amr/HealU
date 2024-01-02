/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Patient from "./patientSlice";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY"

export default interface Slot {
  _id?: string;
  doctorId: number;
  clinicId: number;
  patient?: Patient;
  weekDay: string;
  time: string | null;
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
      const response = await axios.post<Slot>(
        "https://healu-api-gateway.onrender.com/api/appointment/slots",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
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

export const updateSlot = createAsyncThunk(
  "slots/updateSlot",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .patch<Slot>(`https://healu-api-gateway.onrender.com/api/appointment/slots/${id}`, {
        patient: "   ",
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.message));
  }
);

export const getSlots = createAsyncThunk(
  "slots/getSlots",
  async (selectedDate: string | void, thunkAPI) => {
    try {
      const response = await axios.get<Slot[]>(
        `https://healu-api-gateway.onrender.com/api/appointment/doctor/:doctorId`, {
          headers: {
            "auth-token": authToken,
          },
        })
      return response.data.filter((item: any) => {
        // Assuming item.date is in the format "YYYY-MM-DDTHH:mm:ss.000Z"
        const itemDate = new Date(item.date).toISOString().split('T')[0];
        return itemDate === selectedDate;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const deleteSlot = createAsyncThunk(
  "slots/deleteSlot",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .delete<Slot[]>(`http://localhost:3003/slots/${id}`)
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.message));
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
    }
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
    builder.addCase(deleteSlot.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const addSlotReducers = addSlotSlice.reducer;
export const addSlotActions = addSlotSlice.actions;
