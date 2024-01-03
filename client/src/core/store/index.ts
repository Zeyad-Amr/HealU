import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
import analytics from "../../modules/admin-portal/slices/analytics-slice";
import patients from "../../modules/clinics-portals/pediatric/slices/patient-slice";
import auth from "../../modules/auth/slices/auth-slice";
import user from "../../modules/user/slices/user-slice";
import { rootReducer } from "../../modules/clinics-portals/orthopedic/slices/combineReducers";

export const store = configureStore({
  reducer: {
    auth,
    devices,
    schedules,
    patients,
        user,
      analytics,
    rootReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
