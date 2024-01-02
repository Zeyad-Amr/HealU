import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface analyticsClinic {
  id: string;
  name: string;
  numberOfDoctors: number;
}
export interface TotalRevenue {
  [key: string]: number;
  averageAllClinics: number;
  total: number;
}

export interface BillsAdded {
  [key: string]: number;
  averageAllClinics: number;
  total: number;
}

export interface InvoicesAdded {
  [key: string]: number;
  averageAllClinics: number;
  total: number;
}

export interface analyticsBilling {
  totalRevenue: TotalRevenue;
  billsAdded: BillsAdded;
  invoicesAdded: InvoicesAdded;
}

export interface analyticsMedicalRecords {
  recordsAdded: Record<string, number>;
  prescriptionsAdded: Record<string, number>;
  medicalHistoryAdded: Record<string, number>;
}

export interface analyticsAgeDistribution {
  "0-18": number;
  "19-35": number;
  "36-50": number;
  "50+": number;
}

export interface analyticsGenderDistribution {
  [key: string]: number;
  male: number;
  female: number;
}

export interface PatientDemographics {
  ageDistribution: analyticsAgeDistribution;
  genderDistribution: Record<string, analyticsGenderDistribution>;
}

export interface AnalyticsData {
  numberOfActivePatients: number;
  numberOfNewPatients: number;
  billing: analyticsBilling;
  medicalRecords: analyticsMedicalRecords;
  patientDemographics: PatientDemographics;
  percentageOfScheduledSlots: Record<string, string>;
  numberOfAppointments: Record<string, number>;
  numberOfServicesUsed: Record<string, number>;
}

export interface analyticsClinicAnalytics {
  numberOfAllPatients: number;
  numberOfDoctors: number;
  numberOfClinics: number;
  clinics: analyticsClinic[];
}

export interface analyticsApiResponse {
  status: string;
  message: string;
  timeframe: string;
  general: analyticsClinic;
  analytics: AnalyticsData;
}

export interface analyticsState {
  allAnalytics: analyticsApiResponse;
  isLoading: boolean;
  error: string;
}

const initialState: analyticsState = {
  allAnalytics: {} as analyticsApiResponse,
  isLoading: false,
  error: "",
};

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_data: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.get(
        `https://healu-api-gateway.onrender.com/api/analytics?timeframe=${_data}`,
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY",
          },
        }
      );
      //   console.log(response.data);
      const Analytics: analyticsApiResponse = response.data;
      return Analytics;
    } catch (error) {
      return rejectWithValue("Failed to fetch analytics");
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.pending, (state, action) => {
      state.isLoading = true;
      console.log("fetching analytics");
    });
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allAnalytics = action.payload;
      console.log("fetched ");
    });
    builder.addCase(fetchAnalytics.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      console.log("failed to fetch analytics");
    });
  },
});

export default analyticsSlice.reducer;
