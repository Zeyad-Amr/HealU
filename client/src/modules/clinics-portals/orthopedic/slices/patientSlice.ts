import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getPatients = createAsyncThunk("patient/getPatients", (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  axios
    .get("")
    .then((res) => {
      return res.data;
    })
    .catch((error) => rejectWithValue(error.message));
});

export interface patient {
  patientId: number;
  patientName: string;
}

const initialStatePatients: patient = {
  patientId: NaN,
  patientName: " ",
};

const patientSlice = createSlice({
  name: "patients",
  initialState: initialStatePatients,
  reducers: {},
  extraReducers: (builder)=> {
    builder.addCase(getPatients.fulfilled,(state,action)=>{
        console.log(action);
    });
    builder.addCase(getPatients.pending,(state,action)=>{
        console.log(action);
    });
  }
});

export const patientReducers = patientSlice.reducer;
export const patientActions = patientSlice.actions;
