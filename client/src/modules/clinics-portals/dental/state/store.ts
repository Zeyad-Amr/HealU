import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slices/slotsSlice";
import appointmentReducer from "./slices/appointmentSlice";

export const store = configureStore({
    reducer: {
        slots: slotReducer,
        appointments:appointmentReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
