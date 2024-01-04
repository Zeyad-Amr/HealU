import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./../../../../core/api/api";

export interface drugData {
  DrugName: string;
  DrugDose: string;
  DrugDuration: string;
}

export interface prescreptionData {
  AppointmentID: string;
  DoctorName: string;
  Diagnosis: string;
  ExtraNotes: string;
  Drugs: drugData[];
}
export interface prescrpetionState {
  Prescreptions: prescreptionData[];
  loading: boolean;
  error: string;
}
const initialState: prescrpetionState = {
  Prescreptions: [],
  loading: false,
  error: "",
};
export const AddPrescreptions = createAsyncThunk(
  "prescreption/AddPrescreptions",
  async (data: prescreptionData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await api.post("/emr/prescription", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to upload prescreption");
    }
  }
);

const prescreptionSlice = createSlice({
  name: "prescreption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddPrescreptions.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddPrescreptions.fulfilled, (state, action) => {
      state.loading = false;
      state.Prescreptions = action.payload;
    });
    builder.addCase(AddPrescreptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default prescreptionSlice.reducer;
