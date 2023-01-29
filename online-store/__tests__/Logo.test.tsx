/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Logo from '../src/components/Logo/Logo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

describe('Logo', () => {
  it('Logo renders', () => {
    render(
      <Provider store={store}>
        <Logo />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText(/Online/i)).toBeInTheDocument();
  });
});
