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
      const title = action.payload.title.toLowerCase();
      const { minValue, maxValue } = action.payload;
      state[title] = [minValue, maxValue];
    },
  },
});

export const { toggleCheckbox, setDualSlider } = filtersSlice.actions;

export default filtersSlice.reducer;
