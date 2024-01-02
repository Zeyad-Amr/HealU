import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import prescreption from "../../modules/clinics-portals/pediatric/slices/prescreption-slice";
import record from "../../modules/clinics-portals/pediatric/slices/record-slice";
import appointment from "../../modules/clinics-portals/pediatric/slices/appointment-slice";
import slots from "../../modules/clinics-portals/pediatric/slices/slots-slice";
export const store = configureStore({
  reducer: {
    devices,
    schedules,
    patients,
    prescreption,
    record,
    appointment,
    slots,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
