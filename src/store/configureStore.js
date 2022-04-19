import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos';
import rootReducer from './combineReducer';

export const store = configureStore({
  reducer: rootReducer,
});
