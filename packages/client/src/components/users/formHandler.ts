import React from 'react';

type FormError = {
  isPasswordValid: boolean;
  isEmailValid: boolean;
};

const checkEmail = (val: string): boolean => {
  const regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return regex.test(val);
};

const checkPassword = (val: string): boolean => {
  const regex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$%&*()+_-].*[!@#$%&*()+_-])(?=.*[\d].*[\d])(?=.*[a-z].*[a-z]).{8,15}$/;

  return regex.test(val);
};

const formHandler = (
  { name, value }: { name: string; value: string },
  formError: FormError,
  setFormError: React.Dispatch<React.SetStateAction<FormError>>,
): void => {
  console.log('test');
  switch (name) {
    case 'password':
      setFormError({
        ...formError,
        isPasswordValid: checkPassword(value),
      });
      break;
    case 'email':
      setFormError({
        ...formError,
        isEmailValid: checkEmail(value),
      });
      break;
    default:
  }
};

export default formHandler;
