import { configureStore } from "@reduxjs/toolkit";
import slotReducer from "./slices/slotsSlice";
import appointmentReducer from "./slices/appointmentSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    slots: slotReducer,
    appointments: appointmentReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
