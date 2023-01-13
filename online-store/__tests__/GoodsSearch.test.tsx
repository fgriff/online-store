/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import GoodsSearch from '../src/components/goods/GoodsSearch/GoodsSearch';

describe('GoodsSearch', () => {
  it('GoodsSearch renders', () => {
    render(
      <Provider store={store}>
        <GoodsSearch />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
});
