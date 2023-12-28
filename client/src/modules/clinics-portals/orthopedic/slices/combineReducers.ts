import { combineReducers } from "@reduxjs/toolkit";
import { patientReducers } from "./patientSlice";
import { scheduleReducers } from "./scheduleSlice";
import { addSlotReducers } from "./addSlotsSlice";

export const rootReducer = combineReducers({
  patients: patientReducers,
  schedules: scheduleReducers,
  slots: addSlotReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
