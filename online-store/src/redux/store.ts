import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import basketReducer from './slices/basketSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
  basket: basketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
