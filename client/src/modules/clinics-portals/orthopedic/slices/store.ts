import { configureStore } from "@reduxjs/toolkit";
import { patientReducers } from "./patientSlice";
import { scheduleReducers } from "./scheduleSlice";
import { medicationsReducer } from "./medicationsSlice";

export const store = configureStore({
    reducer:{
        patientReducers,
        scheduleReducers,
        medicationsReducer
    }
})