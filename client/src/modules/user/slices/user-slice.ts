import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../core/api/api";
import UserModel from "../models/user-model";

export interface UserState {
    user?: UserModel;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    loading: false,
    error: '',
}

export const register = createAsyncThunk(
    'user/register',
    async (data: any, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {

            const newData: UserModel = { ...data, role: 'Patient', phoneNumber: '+2' + data.phoneNumber };
            console.log('data', newData);
            const response = await api.post('/registration/patient', newData);
            console.log('response', response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            console.log('loading', state.loading);
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            console.log('register', action.payload);
        });

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            console.log('error', action.payload);
        });
    }
})

export default userSlice.reducer;