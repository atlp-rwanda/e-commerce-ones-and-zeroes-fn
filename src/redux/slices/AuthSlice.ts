import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../Constants/api';

interface UserData {
    firstName:string;
    lastName: string;
    email:string;
    password: string;
}
interface UserInfoInterface extends UserData {
    message?: string;
    
}

interface AuthState {
    userInfo: UserInfoInterface | null;
    loading: boolean;
    error: any;
    isSucceeded: boolean;
}

export const signupUser = createAsyncThunk<UserData, UserData, { rejectValue: any }>(
    'auth/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/registerUser`, userData);
            return response.data;
        } catch (error:any) {
            if (!axios.isAxiosError(error)) {
                return error.response.data
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
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isSucceeded = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.isSucceeded = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isSucceeded = false;
            })
            
    },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
