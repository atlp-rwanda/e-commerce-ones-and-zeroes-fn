import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../asios';
import { RootState } from '../store'; 

interface DeletedProduct {
  id: number;
}

interface DeletedState {
  loading: boolean;
  error: string | null;
}

export const deleteProductAction = createAsyncThunk<number, number>(
  'product/deleteProductAction',
  async (productId: number, { rejectWithValue }) => {
    console.log("Received product ID for deletion:", productId); 
    try {
      const res = await axiosInstance.delete(`/api/products/${productId}`);
      return productId;
    } catch (error: any) {
      console.error('Delete product error:', error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);


const deletedAdapter = createEntityAdapter<DeletedProduct>();
const { selectById, selectAll } = deletedAdapter.getSelectors((state: RootState) => state.deleted);



const deletedSlice = createSlice({
  name: 'deleted',
  initialState: deletedAdapter.getInitialState<DeletedState>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(deleteProductAction.fulfilled, (state, action: PayloadAction<number>) => { 
        state.loading = false;
        deletedAdapter.removeOne(state, action.payload); 
      })
      .addCase(deleteProductAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete product'; 
      });
  },
});
  


export const selectAllDeleted = selectAll;
export const selectDeletedById = (id: number) => (state: RootState) => selectById(state, id);

export default deletedSlice.reducer;