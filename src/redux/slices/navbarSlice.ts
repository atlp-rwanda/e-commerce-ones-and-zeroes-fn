// navbarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartUpdated: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    notifyCartUpdate(state) {
      state.cartUpdated = !state.cartUpdated;
    },
  },
});

export const { notifyCartUpdate } = navbarSlice.actions;
export default navbarSlice.reducer;
