import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface patientPrsonalInfo {
    name: string;
    wight: number;
    height: number;
    age: number;
}