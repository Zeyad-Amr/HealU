import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../core/api/api";

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
    try {
      const res = await api.get<any>("/registration/staff");
      return res.data.data.filter((item: any) => item.role === "Doctor");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (data: Doctor, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.post<Doctor>("/registration/staff", data);
      return res.data;
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.error);
      return rejectWithValue(error.message);
    }
  }
);

export const getDoctorById = createAsyncThunk(
  "doctors/getDoctorById",
  async (id: number | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get<Doctor>(`/registration/staff/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id: number | undefined, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.delete<Doctor>(`/registration/staff/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
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

    try {
      const res = await api.put<Doctor>(
        `/registration/staff/${doctorId}`,
        updatedData
      );
      return res.data;
    } catch (error: any) {
      alert(error.response.data.error);
      return rejectWithValue(error.message);
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.doctors = (action.payload as any) || [];
      }
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      console.log("rawda", action.payload);
      if (action.payload !== undefined) {
        state.doctors.push(action.payload as Doctor);
      }
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      const deletedDoctorId = action.payload as unknown as number | undefined;
      if (deletedDoctorId !== undefined) {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.userId !== deletedDoctorId
        );
      }
    });

    builder.addCase(getDoctors.rejected, (state, action) => {
      const doctorId = action.payload as number | undefined;
      if (doctorId !== undefined) {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.userId !== doctorId
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
