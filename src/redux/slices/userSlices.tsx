import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  const response = await axios.get(`http://localhost:7000/api/users/${id}`);
  return response.data.data;
});
// Async thunk for updating user data
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, user }: { id: string; user: User }) => {
    console.log('Updating user with ID:', id);
    console.log('User data being sent:', user);
    const response = await axios.patch(`http://localhost:7000/api/users/${id}`, user);
    console.log('Response from server:', response.data);
    return response.data;
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