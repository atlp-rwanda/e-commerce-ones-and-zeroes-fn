import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signupReducer from "./slices/SignupSlice";
import loginReducer from "./slices/loginSlice";
import googleLoginReducer from "./slices/googleLoginSlice";
import tokenReducer from "./slices/tokenSlice"
import productsReducer from './slices/availableProductSlice';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  products: productsReducer,
  googleLogin: googleLoginReducer,
  token: tokenReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
