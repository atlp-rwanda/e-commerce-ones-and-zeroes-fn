import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/exampleSlice';

const rootReducer = combineReducers({
  example:todoReducer,
  
});
const store = configureStore({
  reducer: 
    rootReducer,  
  
});
export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
