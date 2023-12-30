import { combineReducers } from "@reduxjs/toolkit";
import { patientReducers } from "./patientSlice";
import { scheduleReducers } from "./scheduleSlice";
import { addSlotReducers } from "./addSlotsSlice";
import doctorReducers from "../../../admin-portal/slices/doctor-slice";
import { formReducers } from "../../../admin-portal/slices/form-slice";

export const rootReducer = combineReducers({
  patients: patientReducers,
  schedules: scheduleReducers,
  slots: addSlotReducers,
  doctors: doctorReducers,
  form: formReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
