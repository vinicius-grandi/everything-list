import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import type { AuthContextType } from '../contexts/AuthContext';

type Methods = AuthContextType['login'] | AuthContextType['signup'];

const submit = async (
  e: React.FormEvent<HTMLFormElement>,
  method: Methods,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
): Promise<void> => {
  e.preventDefault();
  const form = e.currentTarget;
  if (method !== undefined) {
    const response = await method(form);
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

export default submit;
