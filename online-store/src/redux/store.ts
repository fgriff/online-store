import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import headerReducer from './slices/headerSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
  header: headerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
