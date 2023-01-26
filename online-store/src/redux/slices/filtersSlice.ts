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
      const filterName = state.filterValues[title] as string[];

      const idx = filterName.indexOf(value);

      if (action.payload.isChecked) {
        if (idx !== -1) {
          filterName.splice(idx, 1);
        }
      } else {
        if (idx === -1) {
          filterName.push(value);
        }
      }

      state.isNotPriceSlider = false;
      state.isNotStockSlider = false;
    },
    setDualSlider(state, action) {
      const { title, minValue, maxValue, init } = action.payload;
      state.filterValues[title] = [minValue, maxValue];

      if (init) {
        if (title === 'price') {
          state.isNotPriceSlider = true;
          state.isNotStockSlider = false;
        } else if (title === 'stock') {
          state.isNotPriceSlider = false;
          state.isNotStockSlider = true;
        }
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
      const { brand, category, price, stock } =
        action.payload.productsTotalCount;
      state.filteredProductsCount.brand = brand;
      state.filteredProductsCount.category = category;

      if (state.isNotPriceSlider) {
        state.filteredProductsCount.price = state.filterValues.price;
        state.filteredProductsCount.stock = stock;
      } else if (state.isNotStockSlider) {
        state.filteredProductsCount.price = price;
        state.filteredProductsCount.stock = state.filterValues.stock;
      } else {
        state.filteredProductsCount.price = price;
        state.filteredProductsCount.stock = stock;
      }
    },
    resetFilters(state) {
      state.filterValues = {
        brand: [],
        category: [],
        price: state.initialProductsCount.price,
        stock: state.initialProductsCount.stock,
        sort: '',
        search: '',
        layout: state.filterValues.layout,
      };
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
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
