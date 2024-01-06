import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ExaminationRecord {
  appointmentId: string;
  Diagnosis: string;
  weight: number;
  height: number;
  MedicalTests: Array<{ TestDescription: string }>;
  prescription: Array<{
    ExtraNotes: string;
    DrugName: string;
    DrugDuration: string;
    DrugDose: string;
  }>;
  Vitals: {
    BloodPressure: string;
    RespirationRate: string;
    HeartRate: string;
    DiabeticTest: string;
    SPO2: string;
  };
  Vaccines: Array<{
    VaccineName: string;
    VaccineType: string;
    VaccineDate: string;
  }>;
  EyeMeasurements: {
    LeftEye: string;
    RightEye: string;
  };
  NutritionData: {
    DietPlan: string;
    Inbody: string;
  };
}
export interface ExaminationState {
  MedicalRecord: ExaminationRecord;
  loading: boolean;
  error: string;
}
const initialState: ExaminationState = {
  MedicalRecord: {} as ExaminationRecord,
  loading: false,
  error: "",
};

export const addExaminationRecord = createAsyncThunk(
  "examination/addExaminationRecord",
  async (data: ExaminationRecord, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.post(
        "https://healu-api-gateway.onrender.com/api/data/examination",
        data,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
          },
        }
      );
    } catch (error) {
      return rejectWithValue("Failed to add examination record");
    }
  }
);

const examinationSlice = createSlice({
  name: "examination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addExaminationRecord.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addExaminationRecord.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.MedicalRecord = action.payload;
      }
    });
    builder.addCase(addExaminationRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default examinationSlice.reducer;
