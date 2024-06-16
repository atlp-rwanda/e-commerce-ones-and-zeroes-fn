import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/api';



interface UserData {
    email: string;
    password: string;
}

interface UserInfoInterface extends UserData {
    message?: string;
}

export interface AuthState {
    userInfo: UserInfoInterface | null;
    loading: boolean;
    error: any;
    isSucceeded: boolean;
}

export const loginUser = createAsyncThunk<UserData, UserData, { rejectValue: any }>(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error:any) {
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

export const { resetAuthState } = loginSlice.actions;

export default loginSlice.reducer;
