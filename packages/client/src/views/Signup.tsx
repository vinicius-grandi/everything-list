import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import submit from './utils';

export const RegisterForm = styled.form`
  margin: 1rem;
  background-color: #38754c;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  #error-msg {
    color: #f15656;
  }

  label {
    flex-basis: 0;
    font-weight: 600;
    display: flex;
    color: #f6f6f6;
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    color: #f6f6f6;
  }

  input,
  label {
    font-size: 1.1rem;
  }

  input {
    width: 90%;
    margin: 0.5rem;
  }

  input[type='submit'] {
    width: fit-content;
    align-self: center;
    margin: 1rem 0;
    font-size: 1.02rem;
    padding: 0.2rem;
  }
`;

function Signup(): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    await submit(e, signup, setError, navigate);
  };

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label htmlFor="username">
        Username:
        <input
          placeholder="type your username here"
          type="text"
          minLength={0}
          maxLength={15}
          data-testid="username"
          data-cy="username"
          name="username"
          id="username"
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          placeholder="type your email here"
          type="email"
          data-testid="email"
          data-cy="email"
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
          id="password"
          data-cy="password"
          pattern="^(?=.*[A-Z].*[A-Z])(?=.*[!@#$%&*()+_-].*[!@#$%&*()+_-])(?=.*[\d].*[\d])(?=.*[a-z].*[a-z]).{8,15}$"
          minLength={8}
          maxLength={15}
          onInvalid={(ev) => {
            const elem = ev.target as HTMLInputElement;
            elem.setCustomValidity(
              'Your password is too weak! Please be sure it has at least 2 special characters(!@#$%&*()+_-), 2 uppercase letters, 2 lowercases and 2 numbers. Length - between 8 and 15 characters',
            );
          }}
        />
      </label>
      {error && <p id="error-msg">invalid username/password</p>}
      <input type="submit" data-testid="submit" value="Sign Up" />
    </RegisterForm>
  );
}

export default Signup;
