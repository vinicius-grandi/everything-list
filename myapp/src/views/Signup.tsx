import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

// /signup
// /login
// /logout
function Signup(): JSX.Element {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void | JSX.Element> => {
    e.preventDefault();
    console.log(auth);
    const form = e.currentTarget;
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: new FormData(form),
      });

      console.log(response.status);

      return navigate('/', {
        replace: true,
      });
    } catch (error) {
      return navigate('/weapons', {
        replace: true,
      });
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
