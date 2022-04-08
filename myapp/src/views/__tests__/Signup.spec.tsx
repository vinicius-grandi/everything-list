/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import type { FetchMock } from 'jest-fetch-mock/types';
import renderWithRouter from './utils/renderWithRouter';
import Signup from '../Signup';

const fetchMock = fetch as FetchMock;

describe('Signup', () => {
  it('should redirect page when signup is succesful - status 200', async () => {
    fetchMock.mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(),
          status: 200,
        }),
    );
    const { getByTestId } = renderWithRouter(<Signup />, { route: '/signup' });
    const firstState = window.history.state;
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const emailInput = getByTestId('email');
    const submitButton = getByTestId('submit');

    await act(async () => {
      fireEvent.input(usernameInput, { target: { value: 'muitobala' } });
      fireEvent.input(passwordInput, { target: { value: '12345678' } });
      fireEvent.input(emailInput, { target: { value: 'jojo@gmail.com' } });
      fireEvent.click(submitButton);
    });

    expect(firstState).not.toEqual(window.history.state);
  });
  it('should return bad request when login data is wrong - status 400', async () => {
    fetchMock.mockImplementation(
      (): Promise<any> => Promise.reject(new Error('status 400')),
    );
    const { getByTestId } = renderWithRouter(<Signup />, { route: '/signup' });
    const firstState = window.history.state;
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const emailInput = getByTestId('email');
    const submitButton = getByTestId('submit');

    await act(async () => {
      fireEvent.input(usernameInput, { target: { value: 'muitobala' } });
      fireEvent.input(passwordInput, { target: { value: '12345678' } });
      fireEvent.input(emailInput, { target: { value: 'jojo' } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText('Bad Request')).toBeInTheDocument();
  });
});
