import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RegisterForm as LoggingForm, Signing } from './Signup';
import submit from './utils';
import Loading from '../components/Loading';

function Login(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    setLoading(true);
    const response = await submit(e, login, setError, navigate);
    if (response === null) {
      setLoading(false);
    }
  };

  return (
    <LoggingForm onSubmit={handleSubmit}>
      {loading && (
        <Signing>
          LOGGING IN...
          <Loading size={50} />
        </Signing>
      )}
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
          minLength={8}
          maxLength={15}
        />
        {error && error.length > 1 && <p>{error}</p>}
        <input type="submit" data-testid="submit" value="Login" />
      </label>
    </LoggingForm>
  );
}

export default Login;
