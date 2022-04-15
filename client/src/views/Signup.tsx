import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const SignupForm = styled.form`
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
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const { signup } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    if (signup !== undefined) {
      const response = await signup(form);
      if (response) {
        if (response.status !== 200) {
          setError(true);
        } else {
          navigate('/', {
            replace: true,
          });
        }
      }
    }
  };
  return (
    <SignupForm onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label htmlFor="username">
        Username:
        <input
          placeholder="type your username here"
          type="text"
          data-testid="username"
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
      </label>
      {error && <p id="error-msg">invalid username/password</p>}
      <input type="submit" data-testid="submit" value="Sign Up" />
    </SignupForm>
  );
}

export default Signup;
