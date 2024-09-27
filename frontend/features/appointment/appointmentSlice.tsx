/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Appointment } from "@/components/forms/AppointmentForm";

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

// Async thunk to get all appointments
export const getAllAppointments = createAsyncThunk(
  "appointments/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("Failed to fetch appointments");
    }
  }
);

// Async thunk to update an appointment
export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async (
    {
      appointmentId,
      appointmentData,
    }: { appointmentId: string; appointmentData: Partial<Appointment> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/${appointmentId}`,
        appointmentData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("Failed to update appointment");
    }
  }
);

// Define the initial state for the appointment slice
interface AppointmentState {
  appointments: Appointment[];
  appointment?: Appointment | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  appointment: null,
  loading: false,
  error: null,
};

// Create the appointment slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get all appointments
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (appointment) => appointment.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
