import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasketState, IProductsState } from '../../types/basket';

const initialState: IBasketState = {
  totalPrice: 0,
  totalCount: 0,
  isModal: false,
  productsState: {},
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
    destroyProduct(state, action) {
      const { price, count } = action.payload;
      state.totalPrice -= price * count;
      state.totalCount -= count;
    },
    openModal(state, action) {
      state.isModal = action.payload.open;
    },
    closeModal(state, action) {
      state.isModal = action.payload.close;
    },
    clearCart(state) {
      state.totalPrice = 0;
      state.totalCount = 0;
    },

    setProductsState(
      state,
      action: PayloadAction<{ products: IProductsState }>,
    ) {
      state.productsState = action.payload.products;
    },
    decQuantity(state, action: PayloadAction<{ id: number; price: number }>) {
      const { id, price } = action.payload;
      const prod = state.productsState[id];
      state.totalPrice -= price;
      state.totalCount -= 1;
      prod.quantity -= 1;
      if (prod.quantity === 0) {
        delete state.productsState[id];
      }
    },
    incQuantity(
      state,
      action: PayloadAction<{ id: number; stock: number; price: number }>,
    ) {
      const { id, stock, price } = action.payload;
      const prod = state.productsState[id];
      if (prod.quantity < stock) {
        prod.quantity += 1;
        state.totalPrice += price;
        state.totalCount += 1;
      }
    },
    removeProduct(state, action: PayloadAction<{ id: number }>) {
      const id = action.payload.id;
      delete state.productsState[id];
    },
  },
});

export const {
  setInitialData,
  addProduct,
  destroyProduct,
  openModal,
  closeModal,
  clearCart,
  setProductsState,
  decQuantity,
  incQuantity,
  removeProduct,
} = basketSlice.actions;

export default basketSlice.reducer;
