/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormProductRegistration from '../src/components/basket/FormProductRegistration/FormProductRegistration';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('BasketForm', () => {
  it('BasketForm render', () => {
    render(
      <Provider store={store}>
        <FormProductRegistration />,
      </Provider>,
      { wrapper: BrowserRouter },
    );

    const inputName = screen.getByPlaceholderText(
      /Your name/i,
    ) as HTMLInputElement;
    const inputPhone = screen.getByPlaceholderText(
      /Phone number/i,
    ) as HTMLInputElement;
    const inputAddress = screen.getByPlaceholderText(
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
    const inputCVV = screen.getByPlaceholderText(/CVV/i) as HTMLInputElement;

    expect(inputName).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
    expect(inputAddress).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputCardNum).toBeInTheDocument();
    expect(inputValid).toBeInTheDocument();
    expect(inputCVV).toBeInTheDocument();
  });

  it('BasketForm validation (incorrect data)', async () => {
    render(
      <Provider store={store}>
        <FormProductRegistration />,
      </Provider>,
      { wrapper: BrowserRouter },
    );

    const inputName = screen.getByPlaceholderText(
      /Your name/i,
    ) as HTMLInputElement;
    const inputPhone = screen.getByPlaceholderText(
      /Phone number/i,
    ) as HTMLInputElement;
    const inputAddress = screen.getByPlaceholderText(
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
    const inputCVV = screen.getByPlaceholderText(/CVV/i) as HTMLInputElement;

    const button = screen.getByRole('button');

    fireEvent.change(inputName, { target: { value: 'Name Su' } });
    fireEvent.change(inputPhone, { target: { value: '+12345678' } });
    fireEvent.change(inputAddress, { target: { value: 'Region House' } });
    fireEvent.change(inputEmail, { target: { value: 'qwerty@mail' } });
    fireEvent.change(inputCardNum, { target: { value: '1234567890' } });
    fireEvent.change(inputValid, { target: { value: '14' } });
    fireEvent.change(inputCVV, { target: { value: '12' } });

    fireEvent.click(button);

    await waitFor(() => {
      const nameError = screen.queryByText(/Enter the name in the format/i);
      const phoneError = screen.queryByText(/Phone in the format/i);
      const addressError = screen.queryByText(/Enter your 3-word address/i);
      const emailError = screen.queryByText(/Enter the correct email address/i);
      const cardNumberError = screen.queryByText(
        /Enter the correct card number/i,
      );
      const validError = screen.queryByText(/Enter the correct Valid Thru/i);
      const cvvError = screen.queryByText(/Enter the correct CVV/i);

      expect(nameError).toBeInTheDocument();
      expect(phoneError).toBeInTheDocument();
      expect(addressError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
      expect(cardNumberError).toBeInTheDocument();
      expect(validError).toBeInTheDocument();
      expect(cvvError).toBeInTheDocument();
    });
  });

  it('BasketForm validation (correct data)', async () => {
    render(
      <Provider store={store}>
        <FormProductRegistration />,
      </Provider>,
      { wrapper: BrowserRouter },
    );

    const inputName = screen.getByPlaceholderText(
      /Your name/i,
    ) as HTMLInputElement;
    const inputPhone = screen.getByPlaceholderText(
      /Phone number/i,
    ) as HTMLInputElement;
    const inputAddress = screen.getByPlaceholderText(
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
    const inputCVV = screen.getByPlaceholderText(/CVV/i) as HTMLInputElement;

    const button = screen.getByRole('button');

    fireEvent.change(inputName, { target: { value: 'Name Surname' } });
    fireEvent.change(inputPhone, { target: { value: '+123456789' } });
    fireEvent.change(inputAddress, {
      target: { value: 'Region Street House' },
    });
    fireEvent.change(inputEmail, { target: { value: 'qwerty@mail.ru' } });
    fireEvent.change(inputCardNum, { target: { value: '1111222233334444' } });
    fireEvent.change(inputValid, { target: { value: '12' } });
    fireEvent.change(inputCVV, { target: { value: '111' } });

    fireEvent.click(button);

    await waitFor(() => {
      const nameError = screen.queryByText(/Enter the name in the format/i);
      const phoneError = screen.queryByText(/Phone in the format/i);
      const addressError = screen.queryByText(/Enter your 3-word address/i);
      const emailError = screen.queryByText(/Enter the correct email address/i);
      const cardNumberError = screen.queryByText(
        /Enter the correct card number/i,
      );
      const validError = screen.queryByText(/Enter the correct Valid Thru/i);
      const cvvError = screen.queryByText(/Enter the correct CVV/i);

      expect(nameError).not.toBeInTheDocument();
      expect(phoneError).not.toBeInTheDocument();
      expect(addressError).not.toBeInTheDocument();
      expect(emailError).not.toBeInTheDocument();
      expect(cardNumberError).not.toBeInTheDocument();
      expect(validError).not.toBeInTheDocument();
      expect(cvvError).not.toBeInTheDocument();
    });
  });
});
