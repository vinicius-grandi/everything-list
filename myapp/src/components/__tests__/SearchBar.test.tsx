import React, { useState } from 'react';
import { mountWithRouter } from '../../views/__tests__/utils/renderWithRouter';
import Header from '../Header';

describe('Search Bar E2E', () => {
  beforeEach(() => {
    mountWithRouter(
      <Header
        setHidden={(() => {
          const [, setHidden] = useState<boolean>(false);
          return setHidden;
        })()}
      />,
    );
    cy.get('[data-cy="full-search"]').as('searchbox');
  });
  it("should hide searchbox when viewport width is lower than 599px and when it's clicked should it prev state", () => {
    cy.viewport(700, 900);
    cy.get('@searchbox').should('be.visible');
    cy.viewport(500, 700);
    cy.get('@searchbox').should('not.be.visible');
    cy.get('[data-cy="search-icon"]').click();
    cy.get('@searchbox').should('be.visible');
  });
  it('should close searchbox when user clicks in anything but search box or search button', () => {
    cy.viewport('samsung-s10');
    cy.get('@searchbox').should('not.be.visible');
    cy.get('body').click('bottom');
    cy.get('[data-cy="search-icon"]').click();
    cy.get('@searchbox').should('be.visible');
    cy.get('body').click('bottom');
    cy.get('@searchbox').should('not.be.visible');
    cy.get('[data-cy="search-icon"]').click();
    cy.get('[data-cy="searchbox"]').click();
    cy.get('@searchbox').should('to.be.visible');
  });
  it('should open menu when it is clicked', () => {
    cy.viewport('samsung-s10');
    cy.contains('Weapons').should('to.be.visible');
    cy.get('[data-cy="menu-icon"]').click();
    cy.contains('Weapons').should('exist');
    let translate = 0;
    cy.get('[data-cy="menu-close-btn"]')
      .click()
      .then(($btn) => {
        const matrix = $btn.parent().css('transform');
        const matrixArr = matrix.split(',');
        translate = Number(matrixArr[4]);
      });

    cy.get('[data-cy="expanded-menu"]').then(($menu) => {
      const matrix = $menu.css('transform');
      const matrixArr = matrix.split(',');
      const menuTransation = Number(matrixArr[4]);
      expect(menuTransation).to.be.eq(translate);
    });
  });
});
