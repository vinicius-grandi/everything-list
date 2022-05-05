/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import Signup from '../Signup';
import { AuthContext } from '../../contexts/AuthContext';

function MockAuthContext({ status }: { status: number }): JSX.Element {
  const auth = false;
  const value = React.useMemo(
    () => ({
      auth,
      signup: (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(),
          status,
        }),
    }),
    [auth, status],
  );
  return (
    <AuthContext.Provider value={value}>
      <Signup />
    </AuthContext.Provider>
  );
}

describe('Signup', () => {
  it('should redirect page when signup is successful - status 200', async () => {
    const { getByTestId } = renderWithRouter(<MockAuthContext status={200} />, {
      route: '/signup',
    });
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
    const { getByTestId } = renderWithRouter(<MockAuthContext status={400} />, {
      route: '/signup',
    });
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const emailInput = getByTestId('email');
    const submitButton = getByTestId('submit');

    if (emailInput instanceof HTMLInputElement) emailInput.type = 'text';

    await act(async () => {
      fireEvent.input(usernameInput, { target: { value: 'muitobala' } });
      fireEvent.input(passwordInput, { target: { value: '12345678' } });
      fireEvent.input(emailInput, { target: { value: 'jojo' } });
      fireEvent.click(submitButton);
    });

    expect(
      await screen.findByText('invalid username/password'),
    ).toBeInTheDocument();
  });
});
