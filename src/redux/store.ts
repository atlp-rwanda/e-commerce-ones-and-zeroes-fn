import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./slices/SignupSlice";
import loginReducer from "./slices/loginSlice";
import googleLoginReducer from "./slices/googleLoginSlice";
import tokenReducer from "./slices/tokenSlice"

import userReducer from './slices/userSlices';

import addressSlice from './slices/addressSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  googleLogin: googleLoginReducer,
  token: tokenReducer,
  user: userReducer,
  address: addressSlice
});


// Configure the store with the rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
