/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasketInput from '../src/components/basket/BasketInput/BasketInput';

describe('BasketInput', () => {
  it('BasketInput values', () => {
    render(
      <BasketInput
        value={'value for test'}
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText(
      /Enter promo code/i,
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'value for test' } });
    expect(input.value).toBe('value for test');
  });
});
