import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import patientReducer from "@/features/patient/patientSlice";
import appointmentReducer from "@/features/appointment/appointmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    patient: patientReducer,
    appointment: appointmentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
