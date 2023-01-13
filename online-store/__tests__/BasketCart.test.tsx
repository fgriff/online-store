/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
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
      <BasketCart
        card={card}
        item={1}
        incQuantity={() => {}}
        decQuantity={() => {}}
      />,
    );

    expect(screen.getByTestId('quantity')).toHaveTextContent('10');
  });
});
