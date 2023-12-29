import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export interface Snackbar {
  message: string;
  type: AlertColor;
}

export interface SnackbarState {
  snackbar: Snackbar;
  snackbarOpen: boolean;
}

const initialState: SnackbarState = {
  snackbar: { message: "", type: "success" },
  snackbarOpen: false,
};

const snackbarSlice = createSlice({
  name: "slots",
  initialState: initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.snackbarOpen = true;
      state.snackbar = action.payload;
    },

    closeSnackbar: (state) => {
      state.snackbarOpen = false;
    },
  },
});

// Export the reducer
export default snackbarSlice.reducer;
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
