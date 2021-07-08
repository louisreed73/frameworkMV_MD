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






describe('Buscador 360 - Buscador Documento Card', () => {


  it('Documento Card Buscador 360 - Snippets Navegacion', () => {
    Cypress.cy.wait(2000);
    // cy.visit("localhost:4200/#/documentos")


    cy.get('.owl-nav .owl-next').click()
    Cypress.cy.wait(1000);

    cy.get('.owl-nav .owl-prev').click()

    Cypress.cy.wait(1000);



  })
  it('Documento Card Buscador 360 - Descargar Documento', () => {
    Cypress.cy.wait(2000);
    // cy.visit("localhost:4200/#/documentos")


    cy.get('.iconDownloadBox')


  })
  it('Documento Card Buscador 360 - Visualizar Documento PDF', () => {
    Cypress.cy.wait(2000);
    // cy.visit("localhost:4200/#/documentos")


    cy.get('.iconFileBox')


  })







})
