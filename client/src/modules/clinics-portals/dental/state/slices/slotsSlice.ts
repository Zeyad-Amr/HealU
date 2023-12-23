import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Slot {
    _id: string;
    doctorId: number;
    clinicId: number;
    time: string;
    weekDay: string;
}

interface SlotState {
    slots: Array<{ slot: Slot; appointmentObject: any }>;
    loading: boolean;
    error: string;
}

const initialState: SlotState = {
    slots: [] as Array<{ slot: Slot; appointmentObject: any }>,
    loading: false,
    error: "",
};

// Create an async thunk for fetching slots for doctors
export const fetchSlotsForDoctor = createAsyncThunk(
    "slot/fetchSlots",
    async ({ doctorId, date }: { doctorId: number; date: string }) => {
        try {
            const response = await axios.get(
                `https://appointment-service-y30u.onrender.com/slots/doctor/${doctorId}/date/${date}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Create an async thunk for fetching slots for doctors
export const deleteSlot = createAsyncThunk(
    "slot/deleteSlot",
    async (slotId: string) => {
        console.log(slotId);
        try {
            await axios.delete(
                `https://appointment-service-y30u.onrender.com/slots/${slotId}`
            );
            return slotId;
        } catch (error) {
            throw error;
        }
    }
);

// Create the slot slice
export const slotSlice = createSlice({
    name: "slot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlotsForDoctor.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchSlotsForDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.slots = action.payload;
            })
            .addCase(fetchSlotsForDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteSlot.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteSlot.fulfilled, (state, action) => {
                state.loading = false;
                state.slots = state.slots.filter(
                    (slot) => slot.slot._id !== action.payload
                );
            })
            .addCase(deleteSlot.rejected, (state, action) => {
                state.loading = false;
                state.error = `Error deleting slot: ${action.error.message}`;
            });
    },
});

// Export the reducer
export default slotSlice.reducer;
