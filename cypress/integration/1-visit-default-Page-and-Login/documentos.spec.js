/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Inicio Buscador 360 - Login', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
  })
  
  it('Login', () => {
    cy.visit('localhost:4200/#/documentos');
    Cypress.cy.wait(2000)
    cy.get("input").eq(0).type("BJUSUSU1");
    cy.get("input").eq(1).type("bjususu1");
    cy.get("input").eq(2).check({
      force: true
    });
    cy.get("button").eq(5).click();

    // cy.get('.section-menu > .mat-icon').click();

  })
  it('Documentos Buscador 360 - Hide SideBar', () => {
    Cypress.cy.wait(2000)


    cy.get('.section-menu > .mat-icon').click();

  })





})
