import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import devices from "../../modules/clinics-portals/pediatric/slices/pediatric-slice";
import schedules from "../../modules/clinics-portals/pediatric/slices/Schedule-slice";
export const store = configureStore({
    reducer: {
        devices,
        schedules,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
