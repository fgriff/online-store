/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import Header from '../src/components/Header/Header';

describe('Header', () => {
  it('Header renders', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
      { wrapper: BrowserRouter },
    );
  });
});
