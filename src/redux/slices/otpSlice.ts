// src/redux/slices/otpSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface OtpData {
  otp: string;
  userId: string;
}

interface OtpResponse {
  token: string;
}

interface OtpState {
  loading: boolean;
  error: any;
  isSucceeded: boolean;
  token: string | null;
  profile: any | null;
}

export const verifyOtp = createAsyncThunk<OtpResponse, OtpData, { rejectValue: any }>(
  'otp/verifyOtp',
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/users/2fa-verify/${userId}`, { token: otp });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);


const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    error: null,
    isSucceeded: false,
    token: null,
    profile: null,
  } as OtpState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.error = null;
      state.isSucceeded = false;
      state.token = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSucceeded = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSucceeded = true;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isSucceeded = false;
      })
  },
});

export const { resetOtpState } = otpSlice.actions;

export default otpSlice.reducer;
