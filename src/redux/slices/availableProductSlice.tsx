import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
  products: any[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

export const fetchAvailableProducts = createAsyncThunk(
  'products/fetchAvailableProducts',
  async (page: number) => {
    const BACKEND_URL= process.env.REACT_APP_BACKEND_URL
    const response = await axios.get(`${BACKEND_URL}/api/products/available?page=${page}`);
    return response.data;
  }
);

const availableProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalPages = action.payload.pagination.totalPages;
        state.currentPage = action.payload.pagination.currentPage;
      })
      .addCase(fetchAvailableProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default availableProductSlice.reducer;
