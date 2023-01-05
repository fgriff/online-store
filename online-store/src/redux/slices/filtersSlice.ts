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
  isNotPriceSlider: false,
  isNotStockSlider: false,
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

      state.isNotPriceSlider = false;
      state.isNotStockSlider = false;
    },
    setDualSlider(state, action) {
      const { title, minValue, maxValue } = action.payload;
      state.filterValues[title] = [minValue, maxValue];

      if (title === 'price') {
        state.isNotPriceSlider = true;
        state.isNotStockSlider = false;
      } else if (title === 'stock') {
        state.isNotPriceSlider = false;
        state.isNotStockSlider = true;
      }
    },
    setSortType(state, action) {
      state.filterValues.sort = action.payload.sort;
      state.isNotPriceSlider = false;
      state.isNotStockSlider = false;
    },
    setSearchField(state, action) {
      state.filterValues.search = action.payload.search;
      state.isNotPriceSlider = false;
      state.isNotStockSlider = false;
    },
    toggleLayout(state, action) {
      state.filterValues.layout = action.payload.layout;
    },
    setInitialData(state, action) {
      state.initialProductsCount = action.payload.initialCount;
      state.initialProducts = action.payload.initialProducts;
    },
    setFilteredData(state, action) {
      state.filteredProducts = action.payload.products;
      const { brand, category, price, stock } = action.payload.filteredCount;
      state.filteredProductsCount.brand = brand;
      state.filteredProductsCount.category = category;

      if (state.isNotPriceSlider) {
        state.filteredProductsCount.price = state.filterValues.price;
        state.filteredProductsCount.stock = stock;
      } else if (state.isNotStockSlider) {
        state.filteredProductsCount.price = price;
        state.filteredProductsCount.stock = state.filterValues.stock;
      } else {
        state.filteredProductsCount = action.payload.filteredCount;
      }
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
