import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface googleUserInfo {
    firstName:string;
    lastName: string;
    email:string;
    password:string;
}
interface UserInfoInterface extends UserData {
    message?: string;
}

export interface AuthState {
    userInfo: UserInfoInterface | null;
    loading: boolean;
    error: any;
    isSucceeded: boolean;
    isAuthenticated: boolean;
}

export const signupUser = createAsyncThunk<UserData, UserData, { rejectValue: any }>(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/registerUser`, userData);
            return response.data;
        } catch (error:any) {
            if (!axios.isAxiosError(error)) {
                return error.response.data;
            }
            return rejectWithValue(error.response?.data);
        }
    }
);

export const googleLoginUser = createAsyncThunk<googleUserInfo, googleUserInfo, { rejectValue: any }>(
    'auth/googleLoginUser',
    async (googleUserInfo, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8000/auth/google/register`, {googleUserInfo});
            localStorage.setItem('token', JSON.stringify(response.data.userToken));
            return response.data;
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error;
            }
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
        isSucceeded: false,
        isAuthenticated: false
    } as AuthState,
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.isSucceeded = false;
            state.isAuthenticated = false;
            state.error = null;
            state.userInfo = null;
        },
    },
  
    
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isSucceeded = false;
                state.isAuthenticated = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.isSucceeded = true;
                state.isAuthenticated = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isSucceeded = false;
                state.isAuthenticated = false;
            })

            .addCase(googleLoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLoginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.isSucceeded = true;
                state.isAuthenticated = true;
            })
            .addCase(googleLoginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isSucceeded = false;
                state.isAuthenticated = false;
            });
            
    },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
