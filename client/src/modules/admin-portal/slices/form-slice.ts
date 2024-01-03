import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { Doctor } from "./doctor-slice";

export interface FormState {
  isFormVisible: boolean;
  isEdit: boolean;
  editedDoctor?: Doctor | null; // Add editedDoctor to FormState
  isTestsVisible?: boolean;
  isServicesVisible?: boolean;
  isPrescriptionVisible?: boolean;
}

const initialState: FormState = {
  isFormVisible: false,
  isEdit: false,
  editedDoctor: null,
  isTestsVisible: false,
  isServicesVisible: false,
  isPrescriptionVisible: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormVisibility(state, action: PayloadAction<boolean>) {
      console.log(state.isFormVisible);
      state.isFormVisible = action.payload;
    },
    setIsEdit(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
    setEditedDoctor(state, action: PayloadAction<Doctor | null>) {
      state.editedDoctor = action.payload;
      console.log(action.payload);
    },
    setPrescriptionVisibility(state, action: PayloadAction<boolean>) {
      state.isPrescriptionVisible = action.payload;
    },
    setTestsVisibility(state, action: PayloadAction<boolean>) {
      state.isTestsVisible = action.payload;
    },
    setServicesVisibility(state, action: PayloadAction<boolean>) {
      state.isServicesVisible = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export const formReducers = formSlice.reducer;
