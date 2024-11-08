// src/redux/Store.ts

import { configureStore } from "@reduxjs/toolkit";
import stepNumberReducer from "../redux/StepNumberSlice";
import otpSentReducer from "../redux/OtpSentSlicer";

// Configure store with type inference
export const store = configureStore({
  reducer: {
    stepNumber: stepNumberReducer,
    otpSent: otpSentReducer,
  },
});

// Type for the state of the entire store
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function of the store
export type AppDispatch = typeof store.dispatch;
