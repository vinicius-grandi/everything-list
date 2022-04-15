import React from 'react';
import MockAuthContext from './utils/MockAuthContext';
import { mountWithRouter } from './utils/renderWithRouter';
import Login from '../Login';

describe('Login', () => {
  it('should return a pop up error when user types weak password', () => {
    mountWithRouter(
      <MockAuthContext status={200}>
        <Login />
      </MockAuthContext>,
      {
        route: '/login',
      },
    );
    cy.get('[data-cy=email]').type('a@gmail.com');
    cy.get('[data-cy=password]').type('12345678').as('password-input');
    cy.get('[type=submit]').click();
    cy.get('@password-input').then(($input) => {
      const passwordInput = $input[0] as HTMLInputElement;
      expect(passwordInput.validationMessage).to.eq(
        'Your password is too weak! Please be sure it has at least 2 special characters(!@#$%&*()+_-), 2 uppercase letters, 2 lowercases and 2 numbers.',
      );
    });
  });
});
