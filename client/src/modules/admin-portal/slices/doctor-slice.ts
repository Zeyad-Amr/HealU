import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMzY2NjAwMX0.nWs6p02Jbm0EDQya2iQht5R129bU2hLIk80A4kdHgDY";

export interface Doctor {
  userId?: number | undefined;
  ssn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  clinicId?: number;
  role: string;
}

export interface DoctorState {
  doctors: Doctor[];
}

const initialState: DoctorState = {
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .get<any>(
        "https://healu-api-gateway.onrender.com/api/registration/staff",
        {
          headers: {
            "auth-token": authToken,
          },
        }
      )
      .then((res) =>
        res.data.data.filter((item: any) => item.role === "Doctor")
      )
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (data: Doctor, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .post<Doctor>(
        "https://healu-api-gateway.onrender.com/api/registration/staff",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const getDoctorById = createAsyncThunk(
  " doctors/getDoctorById",
  async (id: number | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .get<Doctor>(
        `https://healu-api-gateway.onrender.com/api/registration/staff/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id: number | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return axios
      .delete<Doctor>(
        `https://healu-api-gateway.onrender.com/api/registration/staff/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

export const editDoctor = createAsyncThunk(
  "doctors/editDoctor",
  async (
    data: { doctorId: number | undefined; updatedData: Partial<Doctor> },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    const { doctorId, updatedData } = data;

    return axios
      .put<Doctor>(
        `https://healu-api-gateway.onrender.com/api/registration/staff/${doctorId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        rejectWithValue(error.message);
      });
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors = (action.payload as any) || [];
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.doctors.push(action.payload as Doctor);
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      const deletedDoctorId = action.payload as number | undefined;
      if (deletedDoctorId !== undefined) {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.userId !== deletedDoctorId
        );
      }
    });
    builder.addCase(editDoctor.fulfilled, (state, action) => {
      const editedDoctor = action.payload as Doctor | undefined;
      if (editedDoctor !== undefined) {
        state.doctors = state.doctors.map((doctor) =>
          doctor.userId === editedDoctor.userId ? editedDoctor : doctor
        );
      }
    });
    builder.addCase(getDoctorById.fulfilled, (state, action) => {
      const getDoctor = action.payload as Doctor | undefined;
      console.log(getDoctor);
      if (getDoctor !== undefined) {
        state.doctors = state.doctors.map((doctor) =>
          doctor.userId === getDoctor.userId ? getDoctor : doctor
        );
      }
    });
  },
});

export default doctorSlice.reducer;
export const doctorSliceActions = doctorSlice.actions;
