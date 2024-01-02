import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import auth from "../../modules/auth/slices/auth-slice";
import slotReducer from "../../modules/clinics-portals/dental/state/slices/slotsSlice";
import appointmentReducer from "../../modules/clinics-portals/dental/state/slices/appointmentSlice";
import snackbarReducer from "../../modules/clinics-portals/dental/state/slices/snackbarSlice";
import prescriptionReducer from "../../modules/clinics-portals/dental/state/slices/prescriptionSlice";
import examinationReducer from "../../modules/clinics-portals/dental/state/slices/examinationSlice";
import patientReducer from "../../modules/clinics-portals/dental/state/slices/patientSlice";

export const store = configureStore({
    reducer: {
        auth,
        devices,
        schedules,
        patients,

        // Dental Clinic And Appointments
        slotReducer,
        appointmentReducer,
        snackbarReducer,
        prescriptionReducer,
        examinationReducer,
        patientReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
