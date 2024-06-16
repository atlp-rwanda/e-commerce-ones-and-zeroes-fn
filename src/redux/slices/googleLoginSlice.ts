import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/api';

interface googleUserInfo {
    family_name:string;
    given_name: string;
    email:string;
}

interface UserInfoInterface extends googleUserInfo {
    message?: string;
}

export interface AuthState {
    userInfo: UserInfoInterface | null;
    loading: boolean;
    isError: any;
    isSuccessfully: boolean;
}

export const googleLoginUser = createAsyncThunk<googleUserInfo, googleUserInfo, { rejectValue: any }>(
    'auth/googleLoginUser',
    async (googleUserInfo, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/google/register`, googleUserInfo); 
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

const googleLoginSlice = createSlice({
    name: 'googleLogin',
    initialState: {
        userInfo: null,
        loading: false,
        isError: null,
        isSuccessfully: false,
    } as AuthState,
    reducers: {
        resetGoogleLoginState: (state) => {
            state.loading = false;
            state.isSuccessfully = false;
            state.isError = null;
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(googleLoginUser.pending, (state) => {
                state.loading = true;
                state.isError = null;
                state.isSuccessfully = false;
            })
            .addCase(googleLoginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.isSuccessfully = true;
            })
            .addCase(googleLoginUser.rejected, (state, action) => {
                state.isError = action.payload;
                state.loading = false;
                state.isSuccessfully = false;
            });
    },
});

export const { resetGoogleLoginState } = googleLoginSlice.actions;

export default googleLoginSlice.reducer;
