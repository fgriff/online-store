import { createSlice } from '@reduxjs/toolkit';
import { IProductsState } from '../../types/filters';

const initialState: IProductsState = {
  filterValues: {
    brand: [],
    category: [],
    price: [],
    stock: [],
    sort: '',
    search: '',
    layout: '',
  },
  initialProductsCount: {
    brand: {},
    category: {},
    price: [],
    stock: [],
  },
  initialProducts: [],
  filteredProducts: [],
  filteredProductsCount: {
    brand: {},
    category: {},
    price: [],
    stock: [],
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCheckbox(state, action) {
      const title = action.payload.title.toLowerCase();
      const value = action.payload.value.toLowerCase();

      if (action.payload.isChecked) {
        const idx = (state.filterValues[title] as string[]).indexOf(value);

        if (idx !== -1) {
          (state.filterValues[title] as string[]).splice(idx, 1);
        }
      } else {
        (state.filterValues[title] as string[]).push(value);
      }
    },
    setDualSlider(state, action) {
      const { title, minValue, maxValue } = action.payload;
      state.filterValues[title] = [minValue, maxValue];
    },
    setSortType(state, action) {
      state.filterValues.sort = action.payload.sort;
    },
    setSearchField(state, action) {
      state.filterValues.search = action.payload.search;
    },
    toggleLayout(state, action) {
      state.filterValues.layout = action.payload.layout;
    },
    setInitialData(state, action) {
      state.initialProductsCount = action.payload.initialCount;
      state.initialProducts = action.payload.initialProducts;
    },
    setFilteredData(state, action) {
      state.filteredProductsCount = action.payload.filteredCount;
      state.filteredProducts = action.payload.products;
    },
  },
});

export const {
  toggleCheckbox,
  setDualSlider,
  setSortType,
  setSearchField,
  toggleLayout,
  setInitialData,
  setFilteredData,
} = filtersSlice.actions;

export default filtersSlice.reducer;
