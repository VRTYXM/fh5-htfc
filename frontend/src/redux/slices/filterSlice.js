import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setSearchValue, resetFilters } = filterSlice.actions;

export const filterSliceReducer = filterSlice.reducer;
