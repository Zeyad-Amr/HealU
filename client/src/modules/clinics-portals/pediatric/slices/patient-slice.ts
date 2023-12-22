import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface patientPrsonalInfo {
    name: string;
    weight: number;
    height: number;
    age: number;
}

export interface history {
    drugs: string[];
    illnesses: string[];
    tests: string[];
    operation: string[];

    
}

