/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment } from "@/components/forms/AppointmentForm";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Async thunk to create an appointment
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData: Appointment, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments",
        appointmentData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("Failed to create appointment");
    }
  }
);

// Define the initial state for the appointment slice
interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

// Create the appointment slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    // Define other synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of createAppointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state of createAppointment
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      // Handle the rejected state of createAppointment
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions (if any)
export const {} = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice.reducer;
