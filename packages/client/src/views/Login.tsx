import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RegisterForm } from './Signup';
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
    <RegisterForm onSubmit={handleSubmit}>
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
          data-cy="password"
          id="password"
        />
        {error && <p>Incorrect email/password</p>}
        <input type="submit" data-testid="submit" value="Login" />
      </label>
    </RegisterForm>
  );
}

export default Login;