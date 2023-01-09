import { createSlice } from '@reduxjs/toolkit';
import { IBasketState } from '../../types/basket';

const initialState: IBasketState = {
  totalPrice: 0,
  totalCount: 0,
  isModal: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setInitialData(state, action) {
      const { products } = action.payload;

      state.totalPrice += products.reduce(
        (sum: number, product: { count: number; price: number }) =>
          sum + product.price * product.count,
        0,
      );
      state.totalCount += products.reduce(
        (count: number, product: { count: number; price: number }) =>
          count + product.count,
        0,
      );
    },

    addProduct(state, action) {
      state.totalPrice += action.payload.price;
      state.totalCount += 1;
    },
    removeProduct(state, action) {
      state.totalPrice -= action.payload.price;
      state.totalCount -= 1;
    },
    openModal(state, action) {
      state.isModal = action.payload.open;
    },
    closeModal(state, action) {
      state.isModal = action.payload.close;
    },
  },
});

export const {
  setInitialData,
  addProduct,
  removeProduct,
  openModal,
  closeModal,
} = basketSlice.actions;

export default basketSlice.reducer;
