import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL
// Define an interface for the user object

interface User {
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
}
// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (id: string) => {
  if (!BACKEND_URL) {
    console.log('Backend URL is not defined');
  }
  console.log("backend url", BACKEND_URL);
 
   // Retrieve the token from local storage
   const token = localStorage.getItem('token');

   if (!token) {
    //  throw new Error('Bearer token is not available');
     toast(`session expired`);
     
   }
 
   try {
    const response = await axios.get(`${BACKEND_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
});
// Async thunk for updating user data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, user }: { id: string; user: User }, { getState }) => {
    

    if (!BACKEND_URL) {
      throw new Error('Backend URL is not defined');
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      //  throw new Error('Bearer token is not available');
     toast(`session expired`);
    }

    console.log('Updating user with ID:', id);
    console.log('User data being sent:', user);

    try {
      const response = await axios.patch(`${BACKEND_URL}/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response from server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error; // Rethrow the error so it can be caught by the caller
    }
  }
);
// Create a slice for user
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export default userSlice.reducer;