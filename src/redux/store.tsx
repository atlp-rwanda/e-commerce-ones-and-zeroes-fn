import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  
});
const store = configureStore({
  reducer: 
    rootReducer,  
  
});
export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
