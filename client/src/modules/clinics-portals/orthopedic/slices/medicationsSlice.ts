import { createSlice } from "@reduxjs/toolkit";

interface medications {
  drugName: string;
  dosagePerDay: number | string;
}

const initialStateDrug: medications = {
  drugName: " ",
  dosagePerDay: NaN ,
};

const medicationsSlice = createSlice({
  name: "drugs",
  initialState: initialStateDrug,
  reducers: {},
});

export const medicationsReducer = medicationsSlice.reducer;
export const medicationsActions = medicationsSlice.actions;
