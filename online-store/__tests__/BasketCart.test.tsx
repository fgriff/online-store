/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import BasketCart from '../src/components/basket/BasketCart/BasketCart';

describe('BasketCart', () => {
  it('BasketCart renders', () => {
    const product = {
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
    const card = {
      product,
      quantity: 10,
    };

    render(
      <Provider store={store}>
        <BasketCart
          card={card}
          item={1}
          incQuantity={() => {}}
          decQuantity={() => {}}
        />
      </Provider>,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByTestId('quantity')).toHaveTextContent('10');
  });
});
