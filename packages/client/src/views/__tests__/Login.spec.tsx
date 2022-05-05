/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import Login from '../Login';
import MockAuthContext from './utils/MockAuthContext';

describe('Login', () => {
  it('should redirect page when login is successful - status 200', async () => {
    const { getByTestId } = renderWithRouter(
      <MockAuthContext status={200}>
        <Login />
      </MockAuthContext>,
      {
        route: '/login',
      },
    );
    const firstState = window.history.state;
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const submitButton = getByTestId('submit');

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '12345678' } });
      fireEvent.input(emailInput, { target: { value: 'jojo@gmail.com' } });
      fireEvent.click(submitButton);
    });

    expect(firstState).not.toEqual(window.history.state);
  });
  it('should return error when login info is wrong', async () => {
    const { getByTestId, findByText } = renderWithRouter(
      <MockAuthContext status={200}>
        <Login />
      </MockAuthContext>,
      {
        route: '/login',
      },
    );
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const submitButton = getByTestId('submit');

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '12345678' } });
      fireEvent.input(emailInput, { target: { value: 'jojo@gmail.com' } });
      fireEvent.click(submitButton);
    });

    expect(await findByText('Incorrect email/password')).toBeInTheDocument();
  });
});
