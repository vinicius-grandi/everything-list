import React from 'react';
import { mountWithRouter } from '../../views/__tests__/utils/renderWithRouter';
import Header from '../Header';

describe('Search Bar E2E', () => {
  it("should hide seachbox when viewport width is lower than 599px and when it's clicked should it prev state", () => {
    mountWithRouter(<Header />);
    cy.get('[data-cy="full-search"]').as('searchbox');
    cy.viewport(700, 900);
    cy.get('@searchbox').should('be.visible');
    cy.viewport(500, 700);
    cy.get('@searchbox').should('not.be.visible');
    cy.get('[data-cy="search-icon"]').click();
    cy.get('@searchbox').should('be.visible');
  });
});
