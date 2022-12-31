import { createSlice } from '@reduxjs/toolkit';
import { IFiltersState } from '../../types/filters';

const initialState: IFiltersState = {
  brands: [],
  categories: [],
  price: [],
  stock: [],
  sort: '',
  search: '',
  layout: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCheckbox(state, action) {
      const title = action.payload.title.toLowerCase();
      const value = action.payload.value.toLowerCase();

      if (action.payload.isChecked) {
        const idx = (state[title] as string[]).indexOf(value);

        if (idx !== -1) {
          (state[title] as string[]).splice(idx, 1);
        }
      } else {
        (state[title] as string[]).push(value);
      }
    },
    setDualSlider(state, action) {
      const { title, minValue, maxValue } = action.payload;
      state[title] = [minValue, maxValue];
    },
    setSortType(state, action) {
      state.sort = action.payload.sort;
    },
    setSearchField(state, action) {
      state.search = action.payload.search;
    },
    toggleLayout(state, action) {
      state.layout = action.payload.layout;
    },
  },
});

export const {
  toggleCheckbox,
  setDualSlider,
  setSortType,
  setSearchField,
  toggleLayout,
} = filtersSlice.actions;

export default filtersSlice.reducer;
