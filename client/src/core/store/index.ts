import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import auth from "../../modules/auth/slices/auth-slice";
import slotReducer from "../../modules/clinics-portals/dental/state/slices/slotsSlice";
import doctorSlotsReducer from "../../modules/clinics-portals/dental/state/slices/doctorSlotsSlice";
import appointmentReducer from "../../modules/clinics-portals/dental/state/slices/appointmentSlice";
import snackbarReducer from "../../modules/clinics-portals/dental/state/slices/snackbarSlice";
import prescriptionReducer from "../../modules/clinics-portals/dental/state/slices/prescriptionSlice";
import examinationReducer from "../../modules/clinics-portals/dental/state/slices/examinationSlice";
import patientReducer from "../../modules/clinics-portals/dental/state/slices/patientSlice";
import analytics from "../../modules/admin-portal/slices/analytics-slice";
import prescreption from "../../modules/clinics-portals/pediatric/slices/prescreption-slice";
import record from "../../modules/clinics-portals/pediatric/slices/record-slice";
import appointment from "../../modules/clinics-portals/pediatric/slices/appointment-slice";
import slots from "../../modules/clinics-portals/pediatric/slices/slots-slice";
import examination from "../../modules/clinics-portals/pediatric/slices/examination-slice";
import user from "../../modules/user/slices/user-slice";

export const store = configureStore({
  reducer: {
    auth,
    devices,
    schedules,
    patients,
    user,
    analytics,

    // Dental Clinic And Appointments
    slotReducer,
    appointmentReducer,
    snackbarReducer,
    prescriptionReducer,
    examinationReducer,
    patientReducer,
    doctorSlotsReducer,

    prescreption,
    record,
    appointment,
    slots,
    examination,

  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
