import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import todoReducer from './slices/exampleSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  example: todoReducer,
});

// Configure the store with the rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
