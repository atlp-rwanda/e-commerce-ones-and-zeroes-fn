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
  async ({ page, searchKeyword, minPrice, maxPrice }: { page: number; searchKeyword?: string; minPrice?: number; maxPrice?: number }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    let url = `${BACKEND_URL}/api/products/available?page=${page}`;
    
    if (searchKeyword) {
      url = `${BACKEND_URL}/api/products/search/${encodeURIComponent(searchKeyword)}?searchKeyword=${encodeURIComponent(searchKeyword)}&page=${page}`;
    } else {
      url = `${BACKEND_URL}/api/products/available?page=${page}`;
    }

    if (minPrice !== undefined) {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice !== undefined) {
      url += `&maxPrice=${maxPrice}`;
    }

    const response = await axios.get(url);
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
        state.products = action.payload.data || [];
        if (action.payload.pagination) {
          state.totalPages = action.payload.pagination.totalPages;
          state.currentPage = action.payload.pagination.currentPage;
        } else {
          state.totalPages = 0;
          state.currentPage = 1;
        }
      })
      .addCase(fetchAvailableProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default availableProductSlice.reducer;
