import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export  default interface Patient {
  patientId: number;
  patientName: string;
}

export const getPatients = createAsyncThunk("patient/getPatients", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  await axios
    .get<Patient[]>("http://localhost:3005/patients")
    .then((response) => {
      return response.data;
    })
    .catch((error) => rejectWithValue(error.message));
});

const initialStatePatients: Patient[] = [
  {
    patientId: NaN,
    patientName: " ",
  },
];

const patientSlice = createSlice({
  name: "patients",
  initialState: initialStatePatients,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPatients.fulfilled,
      (state, action: PayloadAction<Patient[] | void>) => {
        if (action.payload) {
          state.push(...action.payload);
        }
      }
    );
    builder.addCase(getPatients.pending, (state, action) => {
      console.log(action);
    });
  },
});

export const patientReducers = patientSlice.reducer;
export const patientActions = patientSlice.actions;
