import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// /signup
// /login
// /logout
function Signup(): JSX.Element {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    if (signup !== undefined) {
      const response = await signup(form);
      if (response instanceof Response) {
        navigate('/', {
          replace: true,
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          data-testid="username"
          name="username"
          id="username"
        />
      </label>
      <label htmlFor="email">
        <input type="email" data-testid="email" name="email" id="email" />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password"
          name="password"
          id="password"
        />
      </label>
      <input type="submit" data-testid="submit" />
    </form>
  );
}

export default Signup;
