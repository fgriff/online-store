/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormProductRegistration from "../src/components/basket/FormProductRegistration/FormProductRegistration";
import {Provider} from "react-redux";
import {store} from "../src/redux/store";
import {BrowserRouter} from "react-router-dom";

describe('BasketForm', () => {
  it('BasketForm render', () => {
    render(
      <Provider store={store}>
        <FormProductRegistration
        />,
      </Provider>,
        {wrapper: BrowserRouter}
    );

    const inputName = screen.getByPlaceholderText(
      /Your name/i,
    ) as HTMLInputElement;
    const inputPhone = screen.getByPlaceholderText(
        /Phone number/i,
    ) as HTMLInputElement;
    const inputAddres = screen.getByPlaceholderText(
        /Delivery addres/i,
    ) as HTMLInputElement;
    const inputEmail = screen.getByPlaceholderText(
        /E-mail/i,
    ) as HTMLInputElement;
    const inputCardNum = screen.getByPlaceholderText(
        /Card number/i,
    ) as HTMLInputElement;
    const inputValid = screen.getByPlaceholderText(
        /Valid Thru/i,
    ) as HTMLInputElement;
    const inputCVV = screen.getByPlaceholderText(
        /CVV/i,
    ) as HTMLInputElement;

    expect(inputName).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
    expect(inputAddres).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputCardNum).toBeInTheDocument();
    expect(inputValid).toBeInTheDocument();
    expect(inputCVV).toBeInTheDocument();

  });
});
