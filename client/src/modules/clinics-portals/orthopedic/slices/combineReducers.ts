import { combineReducers } from "@reduxjs/toolkit";
import { patientReducers } from "./patientSlice";
import { scheduleReducers } from "./scheduleSlice";

export const rootReducer = combineReducers({
  patients: patientReducers,
  schedules: scheduleReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
