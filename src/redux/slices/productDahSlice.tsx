import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../asios';
import { createAppAsyncThunk } from './thunks';
import { ReactNode } from 'react';

export const getproductsAction = createAppAsyncThunk(
  "product/getproductsAction",
  async (userId: string, { rejectWithValue }): Promise<Product[]> => {
    try {
      const res = await axiosInstance.get(`/api/products/mine/${userId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getcorectionaction = createAppAsyncThunk(
  "product/getcorectionaction",
  async (userId: string, { rejectWithValue }): Promise<Correction[]> => {
    try {
      const res = await axiosInstance.get("/api/products/collections/list");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getallproductcollectionaction = createAppAsyncThunk(
  "product/getallproductcollectionaction",
  async (collectionId: string, { rejectWithValue }): Promise<Product[]> => {
    try {
      const res = await axiosInstance.get(`/api/products/${collectionId}/products`);
      console.log("------------------------------------------------------------------------------",res)
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductByIdAction = createAppAsyncThunk(
  "product/getProductByIdAction",
  async (productId: string, { rejectWithValue }): Promise<Product> => {
    try {
      const res = await axiosInstance.get(`/api/products/${productId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductAction = createAppAsyncThunk(
  "product/updateProductAction",
  async ({ id, data }: { id: string, data: any }, { rejectWithValue }): Promise<Product> => {
    try {
      const res = await axiosInstance.patch(`/api/products/${id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAppAsyncThunk(
  "product/deleteImage",
  async ({ productId, images }: { productId: number, images: string }, { rejectWithValue }): Promise<Product> => {
    try {
      const res = await axiosInstance.post(`/api/products/remove-image`, { productId, images });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface Product {
  productId: number;
  name: string;
  price: string;
  discount?: number;
  category: string;
  quantity: number;
  images: string[];
  image: string;
}

export interface Correction {
  product: any;
  products: ReactNode;
  id: number;
  name: string;
  totalProducts: number;
}

const initialState: any = {
  products: [],
  corrections: [],
  product: {} as Product,
  loading: false,
  error: null,
  successMessage: null,
  errorMessage: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product: Product) => product.productId === action.payload.productId);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproductsAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getproductsAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to fetch products';
      })
      .addCase(getcorectionaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcorectionaction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.corrections = action.payload;
      })
      .addCase(getcorectionaction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to fetch corrections';
      })
      .addCase(getallproductcollectionaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallproductcollectionaction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action.payload; 
      })
      .addCase(getallproductcollectionaction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to fetch products from collection';
      })
      .addCase(getProductByIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIdAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIdAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to fetch product';
      })
      .addCase(updateProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.products.findIndex((product: Product) => product.productId === action.payload.productId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.successMessage = 'Product updated successfully';
      })
      .addCase(updateProductAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to update product';
      })
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.products.findIndex((product: Product) => product.productId === action.payload.productId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.successMessage = 'Image deleted successfully';
      })
      .addCase(deleteImage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errorMessage = action.payload?.message ?? 'Failed to delete image';
      });
  },
});

export const { updateProduct, clearMessages } = productSlice.actions;
export default productSlice.reducer;
