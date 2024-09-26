/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CreateUserParams {
  phone: string;
  name: string;
  email: string;
}

// Async thunk for creating a user via backend API
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: CreateUserParams, { rejectWithValue }) => {
    try {
      // Replace with your backend API URL
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        user
      );
      console.log("response data", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue("User already exists");
      }
      return rejectWithValue("Failed to create user");
    }
  }
);

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
