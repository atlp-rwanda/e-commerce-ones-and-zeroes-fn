import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/api';

interface TokenState {
    token: string;
}


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.getItem('token'),
    } as TokenState,
    reducers: {
        resetToken: (state) => {
            state.token = '';
           
        },
    },
   
    })

export const { resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
