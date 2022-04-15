import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import submit from './utils';

function Login(): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    await submit(e, login, setError, navigate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input
          placeholder="type your email here"
          type="email"
          data-testid="email"
          name="email"
          id="email"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          placeholder="type your password here"
          type="password"
          data-testid="password"
          name="password"
          pattern=""
          id="password"
          onInvalid={(ev) => {
            const elem = ev.target as HTMLInputElement;
            elem.setCustomValidity(
              'you password must have at least 8 characters',
            );
          }}
        />
        {error && <p>Incorrect email/password</p>}
        <input type="submit" data-testid="submit" value="Sign Up" />
      </label>
    </form>
  );
}

export default Login;
