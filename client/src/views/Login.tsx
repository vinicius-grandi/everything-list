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
          data-cy="email"
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
          pattern="^(?=.*[A-Z].*[A-Z])(?=.*[!@#$%&*()+_-].*[!@#$%&*()+_-])(?=.*[\d].*[\d])(?=.*[a-z].*[a-z]).{8,15}$"
          data-cy="password"
          id="password"
          minLength={8}
          maxLength={15}
          onInvalid={(ev) => {
            const elem = ev.target as HTMLInputElement;
            elem.setCustomValidity(
              'Your password is too weak! Please be sure it has at least 2 special characters(!@#$%&*()+_-), 2 uppercase letters, 2 lowercases and 2 numbers.',
            );
          }}
        />
        {error && <p>Incorrect email/password</p>}
        <input type="submit" data-testid="submit" value="Login" />
      </label>
    </form>
  );
}

export default Login;
