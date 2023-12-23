import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slices/slotsSlice";

export const store = configureStore({
    reducer: {
        slots: slotReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
