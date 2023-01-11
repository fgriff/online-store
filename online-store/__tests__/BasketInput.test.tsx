/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import BasketInput from '../src/components/basket/BasketInput/BasketInput';

describe('BasketInput', () => {
  it('BasketInput values', () => {
    render(<BasketInput />);

    const input = screen.getByPlaceholderText(
      /Enter promo code/i,
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'rs' } });
    expect(input.value).toBe('rs');

    fireEvent.change(input, { target: { value: 'epm' } });
    expect(input.value).toBe('epm');

    fireEvent.change(input, { target: { value: 'sale5' } });
    expect(input.value).toBe('sale5');
  });
});
