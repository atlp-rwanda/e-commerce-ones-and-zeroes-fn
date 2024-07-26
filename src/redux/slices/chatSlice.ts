import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { boolean } from 'yup';


interface ChatState {
  messages: any[];
  loading: boolean;
  error: string | null;
  
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
 
  
};

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Login first");
      throw new Error('Bearer token is not available');
    }
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const response = await axios.get(`${BACKEND_URL}/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('here are our messages',response.data);
    
    return response.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
        
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      });
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
