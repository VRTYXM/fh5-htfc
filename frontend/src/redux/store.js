import { configureStore } from '@reduxjs/toolkit';
import { carCardReducer } from './slices/carCards';
import { filterSliceReducer } from './slices/filterSlice';

const store = configureStore({
  reducer: {
    carCards: carCardReducer,
    filters: filterSliceReducer,
  },
});

export default store;
