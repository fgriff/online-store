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

describe('GoodsCard', () => {
  it('GoodsCard button click', () => {
    const data = {
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
    const layout = 'grid';

    render(
      <Provider store={store}>
        <GoodsCard
          data={data}
          layout={layout}
        />
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
