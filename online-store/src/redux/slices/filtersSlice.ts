import { createSlice } from '@reduxjs/toolkit';
import { IFiltersState } from '../../types/filters';

const initialState: IFiltersState = {
  brands: [],
  categories: [],
  price: [],
  stock: [],
  sortType: '',
  searchValue: '',
  layout: true,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
  },
});

export const {} = filtersSlice.actions;

export default filtersSlice.reducer;
