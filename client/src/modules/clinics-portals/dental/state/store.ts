import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slices/slotsSlice";
import appointmentReducer from "./slices/appointmentSlice";
import snackbarReducer from "./slices/snackbarSlice";
import patientReducer from "./slices/patientSlice";
import historyReducer from "./slices/historySlice";
import prescriptionReducer from "./slices/prescriptionSlice"
import recordReducer from "./slices/recordSlice"

export const store = configureStore({
  reducer: {
    slots: slotReducer,
    appointments: appointmentReducer,
    snackbar: snackbarReducer,
    patient: patientReducer,
    history: historyReducer,
    prescription:prescriptionReducer,
    record: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
