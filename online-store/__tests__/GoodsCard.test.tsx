/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import GoodsCard from '../src/components/goods/GoodsCard/GoodsCard';
import { IProductsItem } from '../src/types/products';

describe('GoodsCard', () => {
  it('GoodsCard button click', () => {
    const data: IProductsItem = {
      id: 1,
      title: '',
      description: '',
      discountPercentage: 1,
      price: 10,
      rating: 5,
      stock: 10,
      brand: '',
      category: '',
      thumbnail: '',
      images: [],
    };

    render(
      <Provider store={store}>
        <GoodsCard data={data} />
      </Provider>,
      { wrapper: BrowserRouter },
    );

    const button = screen.getByRole('button');

    expect(screen.getByRole('button', { name: /Add to cart/i }));

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Remove from cart/i }));

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Add to cart/i }));
  });
});
