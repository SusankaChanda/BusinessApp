import { createSlice } from "@reduxjs/toolkit";

// Define the state type
interface StepNumberState {
  stepCount: number;
}

// Define the initial state
const initialState: StepNumberState = {
  stepCount: 1,
};

export const StepNumberSlice = createSlice({
  name: "stepNumber",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.stepCount < 2) {
        state.stepCount += 1;
      }
    },
    decrement: (state) => {
      if (state.stepCount > 1) {
        state.stepCount -= 1;
      }
    },
  },
});

// Export actions and reducer
export const { increment, decrement } = StepNumberSlice.actions;
export default StepNumberSlice.reducer;
