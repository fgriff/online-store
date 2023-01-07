import { createSlice } from '@reduxjs/toolkit';
import { IHeaderState } from '../../types/header';

const initialState: IHeaderState = {
  cartTotalPrice: 0,
  cartGoodsCount: 0,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.cartTotalPrice = action.payload.price;
      state.cartGoodsCount = action.payload.count;
    },
    incTotalPrice(state, action) {
      state.cartTotalPrice += action.payload.price;
    },
    decTotalPrice(state, action) {
      state.cartTotalPrice -= action.payload.price;
    },
    incProductCount(state) {
      state.cartGoodsCount += 1;
    },
    decProductCount(state) {
      state.cartGoodsCount -= 1;
    },
    incAllData(state, action) {
      state.cartTotalPrice += action.payload.price;
      state.cartGoodsCount += 1;
    },
    decAllData(state, action) {
      state.cartTotalPrice -= action.payload.price;
      state.cartGoodsCount -= 1;
    },
  },
});

export const {
  setInitialData,
  incTotalPrice,
  decTotalPrice,
  incProductCount,
  decProductCount,
  incAllData,
  decAllData,
} = headerSlice.actions;

export default headerSlice.reducer;
