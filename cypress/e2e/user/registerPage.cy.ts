/// <reference types="Cypress" />

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pages/register');
  });

  it('should load register page', () => {
    cy.get('#username').should('exist');
    cy.get('#form-layouts-separator-select').should('exist');
    cy.get('#auth-register-password').should('exist');
  });

  it('should register a new user', () => {
    // enter username
    cy.get('#username').type('John Doe');

    // enter email
    cy.get('input[type="email"]').type('john.doe@example.com');

    // select department
    cy.get('#form-layouts-separator-select').click();
    cy.findByText('소프트웨어 개발').click();

    // enter password
    cy.get('#auth-register-password')
      .type('strong_password');

    // enter confirm password
    cy.get('input[type="password"]:last')
      .type('strong_password');

    // check the checkbox
    cy.get('input[type="checkbox"]').check();

    // click signup button
    cy.get('button[type="submit"]').click();
  });
});
