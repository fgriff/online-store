/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import BasketCart from '../src/components/basket/BasketCart/BasketCart';
import { IProductsItem } from '../src/types/products';
import { ICard } from '../src/types/basket';

describe('BasketCart', () => {
  it('BasketCart renders', () => {
    const product: IProductsItem = {
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

    const card: ICard = {
      product,
      quantity: 10,
    };

    render(
      <Provider store={store}>
        <BasketCart
          card={card}
          item={1}
        />
      </Provider>,
    );

    expect(screen.getByTestId('quantity')).toHaveTextContent('10');
  });
});
