import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../../core/api/api";

export interface AddExamination {
  AppointmentId: string;
  Diagnosis: string;
  MedicalTests: { TestDescription: string }[];
  Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[];
  ////////////////////////////////
  // our clinical doesn't have them
  Vital: { VitalDescription: string }[] | null;
  Vaccines: { VaccinesDescription: string }[] | null;
  EyeMeasurement: { EyeMeasurementDescription: string }[] | null;
  Nutrition: { NutritionDescription: string }[] | null;
}

export interface AddExaminationState {
  addExamination: AddExamination | null;
  loading: boolean;
  error: string;
}

const initialState: AddExaminationState = {
  addExamination: null,
  loading: false,
  error: "",
};

// Create an async thunk for  submit the examination by the doctor for appointment
export const submitNewExamination = createAsyncThunk(
  "addExamination/submitNewExamination",
  async (newAddExamination: AddExamination) => {
    try {
      await axios.post(
        `/data/examination`,
        {
          AppointmentId: newAddExamination.AppointmentId,
          Diagnosis: newAddExamination.Diagnosis,
          MedicalTests: newAddExamination.MedicalTests,
          Drugs: newAddExamination.Drugs,
          Vital: newAddExamination.Vital,
          Vaccines: newAddExamination.Vaccines,
          EyeMeasurement: newAddExamination.EyeMeasurement,
          Nutrition: newAddExamination.Nutrition,
        }
      );
      return newAddExamination;
    } catch (error) {
      throw error;
    }
  }
);

const AddExaminationSlice = createSlice({
  name: "AddExamination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitNewExamination.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(submitNewExamination.fulfilled, (state, action) => {
        state.loading = false;
        state.addExamination = action.payload;
      })
      .addCase(submitNewExamination.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || `Error fetching submitNewExamination`; // return error message from server or default error message
      });
  },
});

// Export the reducer
export default AddExaminationSlice.reducer;
