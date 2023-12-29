import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import prescreption from "../../modules/clinics-portals/pediatric/slices/prescreption-slice";
import record from "../../modules/clinics-portals/pediatric/slices/record-slice";
export const store = configureStore({
  reducer: {
    devices,
    schedules,
    patients,
    prescreption,
    record,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
