import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./slices/SignupSlice";
import loginReducer from "./slices/loginSlice";
import googleLoginReducer from "./slices/googleLoginSlice";
import tokenReducer from "./slices/tokenSlice";
import productsReducer from './slices/availableProductSlice';
import productreducerform from './slices/productDahSlice';
import cartSlice from "./slices/cartSlice";
import navbarSlice from "./slices/navbarSlice";
import otpReducer from './slices/otpSlice'; // Add this line

import userReducer from './slices/userSlices';
import singleItemOrderReducer from "./slices/singleItemOrderSlice";
import productReviewReducer from './slices/productSlice';
import cartCheckoutReducer from "./slices/cartCheckoutSlice";
import addressSlice from './slices/addressSlice';
import deletedReducer from './slices/deleteSlice';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  products: productsReducer,
  googleLogin: googleLoginReducer,
  token: tokenReducer,
  user: userReducer,
  address: addressSlice,
  cart: cartSlice,
  navbarSlice:navbarSlice,
  otp: otpReducer, 
  cartCheckout: cartCheckoutReducer,
  singleItemOrder: singleItemOrderReducer,
  productReviews: productReviewReducer,
  product: productreducerform,
  deleted: deletedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
