import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../../core/api/api";


interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    clinicId: number;
  }
  
export interface ClinicServices {
    status: string;
    results: number;
    data: {
      clinicServices: Service[];
    };
}

export interface clinicServicesState {
    clinicServices: ClinicServices;
    loading: boolean;
    error: string;
}

const initialState: clinicServicesState = {
    clinicServices: {} as ClinicServices,
    loading: false,
    error: "",
};


// Create an async thunk for fetching clinics Services
export const fetchClinicsServices = createAsyncThunk(
    "service/fetchClinicsServices",
    async () => {
      try {
        const response = await axios.get(`/admin/clinic-service`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const ClinicServicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchClinicsServices.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchClinicsServices.fulfilled, (state, action) => {
          state.loading = false;
          state.clinicServices = action.payload;
        })
        .addCase(fetchClinicsServices.rejected, (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Failed to fetch examination data";
        });
    },
  });
  
  export default ClinicServicesSlice.reducer;