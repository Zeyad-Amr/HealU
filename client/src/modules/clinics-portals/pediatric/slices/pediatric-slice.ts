import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface device {
  DeviceName: string;
  DeviceType: string;
  DeviceManufacturer: string;
  PurchaseDate: Date;
  ExpiryDate: Date;
  DeviceStatus: string;
}

export interface AllDevices {
  DeviceID?: number;
  Device: device[];
}

export interface DeviceState {
  AllDevices: AllDevices[];
  loading: boolean;
  error: string;
}

const initialState: DeviceState = {
  AllDevices: [],
  loading: false,
  error: "",
};

export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async (_data: AllDevices[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        "https://pediatric-clinic-devices.onrender.com/device"
      );
      const devices: AllDevices[] = response.data;
      return devices;
    } catch (error) {
      return rejectWithValue("Failed to fetch devices");
    }
  }
);
export const AddDevice = createAsyncThunk(
  "devices/AddDevice",
  async (data: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.post(
        "https://pediatric-clinic-devices.onrender.com/device",
        data
      );
    } catch (error) {
      return rejectWithValue("Failed to fetch devices");
    }
  }
);
export const DeleteDevice = createAsyncThunk(
  "devices/DeleteDevice",
  async (data: Number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(
        `https://pediatric-clinic-devices.onrender.com/device/${data}`
      );
    } catch (error) {
      return rejectWithValue("Failed to fetch devices");
    }
  }
);

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.AllDevices = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(AddDevice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(AddDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(AddDevice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(DeleteDevice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteDevice.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(DeleteDevice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default deviceSlice.reducer;
