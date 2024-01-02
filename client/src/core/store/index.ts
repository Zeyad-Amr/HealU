import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";

import slotReducer from "../../modules/clinics-portals/dental/state/slices/slotsSlice";
import appointmentReducer from "../../modules/clinics-portals/dental/state/slices/appointmentSlice";
import snackbarReducer from "../../modules/clinics-portals/dental/state/slices/snackbarSlice";
import patientReducer from "../../modules/clinics-portals/dental/state/slices/patientSlice";
import historyReducer from "../../modules/clinics-portals/dental/state/slices/historySlice";
import prescriptionReducer from "../../modules/clinics-portals/dental/state/slices/prescriptionSlice";
import dentalRecordReducer from "../../modules/clinics-portals/dental/state/slices/recordSlice";

export const store = configureStore({
  reducer: {
    devices,
    schedules,
    patients,

    // Dental Clinic And Appointments
    slotReducer,
    appointmentReducer,
    snackbarReducer,
    patientReducer,
    historyReducer,
    prescriptionReducer,
    dentalRecordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
