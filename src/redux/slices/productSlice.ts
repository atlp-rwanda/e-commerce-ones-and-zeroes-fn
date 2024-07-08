import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export interface Review {
  rating: number;
  title: string;
  comment: string;
  images: string[];
}

interface ProductReviewState {
  product: any;
  reviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductReviewState = {
  product: null,
  reviews: [],
  status: 'idle',
  error: null,
};

export const fetchProduct = createAsyncThunk('productReviews/fetchProduct', async (productId: string) => {
  const response = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
  return response.data;
});

export const postReview = createAsyncThunk(
    'productReviews/postReview',
    async ({ review, productId }: { review: Review; productId: string }, thunkAPI) => {
      const response = await axios.post(`${BACKEND_URL}/api/product/${productId}/reviews`, review);
      return response.data;
    }
);

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<typeof initialState.product>) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      });
  },
});

export default productReviewsSlice.reducer;
