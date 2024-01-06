import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../core/api/api";

export interface VitalSingns {
  BloodPressure: string;
  RespirationRate: string;
  HeartRate: string;
  DiabeticTest: string;
  SPO2: string;
}
export interface Vaccine {
  VaccineName: string;
  VaccineType: string;
  VaccineDate: string;
}
export interface EyeMeasurements {
  LeftEye?: string;
  RightEye?: string;
}
export interface NutritionData {
  DietPlan?: string;
  Inbody?: string;
}

export interface Record {
  AppointmentID: string;
  Weight: number;
  Height: number;
  ServicesDescription: string;
  RecommendedActionDescription: string;
  Vital: VitalSingns;
  Vaccines: Vaccine[];
  EyeMeasurements: EyeMeasurements[];
  NutritionData: NutritionData[];
}

export interface RecordState {
  Records: Record[];
  loading: boolean;
  error: string;
}

const initialState: RecordState = {
  Records: [],
  loading: false,
  error: "",
};

export const AddRecord = createAsyncThunk(
  "records/AddRecord",
  async (data: Record, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await api.post("/emr/record", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to upload record");
    }
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddRecord.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.Records = action.payload;
    });
    builder.addCase(AddRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default recordSlice.reducer;
