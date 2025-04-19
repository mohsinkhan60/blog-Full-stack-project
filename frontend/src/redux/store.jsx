import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer
  },
});