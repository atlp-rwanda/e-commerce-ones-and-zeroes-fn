// userSlices.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface User {
  use2FA: any;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  billingAddress: string;
  createdAt: string;
  gender: string;
  preferredCurrency: string;
  preferredLanguage: string;
  role: string;
  updatedAt: string;
  isActive: boolean;
  isGoogle: boolean;
  isVerified: boolean;
  password: string;
  passwordLastChanged: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isModalVisible: boolean;
  isSuccess:boolean
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isModalVisible: false,
  isSuccess:false
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast(`Session expired`);
    // throw new Error('Bearer token is not available');
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
    });
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, user }: { id: string; user: User }, { dispatch }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast(`Session expired`);
      throw new Error('Bearer token is not available');
    }

    try {
      const response = await axios.patch(`${BACKEND_URL}/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User updated successfully! ');
     
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update user';
      toast.error(errorMessage);
      throw error;
    }
  }
);




const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalVisible = true;
    },
    closeModal: (state) => {
      state.isModalVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.isModalVisible = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
        state.isSuccess = true;
        state.isModalVisible = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.error.message || 'Failed to update user';
      })
  },
});


export const { openModal, closeModal } = userSlice.actions;
export default userSlice.reducer;
