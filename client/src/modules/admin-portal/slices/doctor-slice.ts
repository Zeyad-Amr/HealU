import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  speciality: string;
}

interface DoctorState {
  doctors: Doctor[];
}

const initialState: DoctorState = {
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .get<Doctor[]>("http://localhost:3003/doctors")
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});


export default doctorSlice.reducer;

