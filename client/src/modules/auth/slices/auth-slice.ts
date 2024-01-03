import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authModel from "../models/auth-model";
import api from "../../../core/api/api";

export interface AuthState {
    auth: authModel;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    auth: {
        username: '',
        password: ''
    },
    loading: false,
    error: ''
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: any, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            console.log('data', data);
            const response = await api.post('/login', data);
            console.log('response', response);
            return response.data;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuth: (state, action: PayloadAction<authModel>) => {
            state.auth = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            console.log('loading', state.loading);
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            const token: string = action.payload['access_token'];
            const userId: number = action.payload['user'].userId;
            localStorage.setItem('auth-token', token);
            localStorage.setItem('userId', JSON.stringify(userId));
            console.log('token', token);
            console.log('user', action.payload['user']);
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            console.log('error', action.payload);
        });
    }
})

export default authSlice.reducer;