import { createSlice } from "@reduxjs/toolkit";

// Define the initial state type
interface OtpSentState {
  firstPageEmail: boolean;
  firstPageMobile: boolean;
  secondPageEmail: boolean;
  secondPageMobile: boolean;
}

// Define the initial state
const initialState: OtpSentState = {
  firstPageEmail: false,
  firstPageMobile: false,
  secondPageEmail: false,
  secondPageMobile: false,
};

export const OtpSentSlicer = createSlice({
  name: "otpSent",
  initialState,
  reducers: {
    toggleOtpSentEmailPage1: (state) => {
      state.firstPageEmail = !state.firstPageEmail;
    },
    toggleOtpSentMobilePage1: (state) => {
      state.firstPageMobile = !state.firstPageMobile;
    },
    toggleOtpSentEmailPage2: (state) => {
      state.secondPageEmail = !state.secondPageEmail;
    },
    toggleOtpSentMobilePage2: (state) => {
      state.secondPageMobile = !state.secondPageMobile;
    },
  },
});

// Export actions and reducer
export const {
  toggleOtpSentEmailPage1,
  toggleOtpSentMobilePage1,
  toggleOtpSentEmailPage2,
  toggleOtpSentMobilePage2,
} = OtpSentSlicer.actions;

export default OtpSentSlicer.reducer;
