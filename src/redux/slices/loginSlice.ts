import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserData {
    userId: any;
    email: string;
    password: string;
}

interface UserInfoInterface {
    email: string;
    password: string;
    message?: string;
}

export interface AuthState {
    userInfo: UserInfoInterface | null;
    loading: boolean;
    error: any;
    isSucceeded: boolean;
}

// export const loginUser = createAsyncThunk<UserData, UserData, { rejectValue: any }>(
//     'login/loginUser',
//     async (userData, { rejectWithValue }) => {
//         try {
//             const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
//             const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
//             localStorage.setItem('token', response.data.token);
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data);
//         }
//     }
// );

export const loginUser = createAsyncThunk<UserData, UserData, { rejectValue: any }>(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
            if (response.data.message === "Check your email for the 2FA token") {
                return { userId: response.data.userId };
            }
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
        isSucceeded: false,
    } as AuthState,
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.isSucceeded = false;
            state.error = null;
            state.userInfo = null;
        },
        logoutUser: (state) => {
            state.isSucceeded = false;
            state.userInfo = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isSucceeded = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.isSucceeded = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isSucceeded = false;
            });
    },
});

export const { resetAuthState, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
