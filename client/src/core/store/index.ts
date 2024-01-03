import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import nutritionReducer from "../../modules/clinics-portals/nutrition/slices/nutritionSlice";

export const store = configureStore({
    reducer: {
        nutrition: nutritionReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
