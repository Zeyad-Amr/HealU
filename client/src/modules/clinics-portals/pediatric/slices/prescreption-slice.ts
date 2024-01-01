import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const response = await axios.post(
        "https://healu-api-gateway.onrender.com/api/emr/prescription",
        data,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
          },
        }
      );
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
