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


function random() {
  return Math.round((Math.random() * (7 - 1)) + 1)
}



describe('Buscador 360 - Buscador Documentos', () => {

  beforeEach(() => {
    cy.restoreLocalStorage();
    // cy.setLocalStorage("MOVA_MOV_PLANTILLA", JSON.stringify(credentials) )
  })
  afterEach(() => {
    cy.saveLocalStorage()
  });


  it('Documentos Buscador 360 - Busqueda sin input - Enter o Click Boton Buscar', () => {
    Cypress.cy.wait(2000);
    // cy.visit("localhost:4200/#/documentos")


    cy.get('#search').type("m{enter}",{timeout:10000});

    Cypress.cy.wait(2000);

    cy.get('#search').clear().type("madrid");
    cy.get('app-button-trigger button').click();
  })


  it('Documentos Buscador 360 - Limpiar - input', () => {
    Cypress.cy.wait(2000);

    cy.get('#search').clear();


  })
  it('Documentos Buscador 360 - Existen los Filtros', () => {
    Cypress.cy.wait(2000);

    cy.get('form').should('be.visible')

  })


  it('Documentos Buscador 360 - Tipo Documental - filtro', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').eq(0).click();

    cy.get("app-autocomplete input").eq(0).type("a", {
      force: true
    });
    cy.get('form .formFilterGroup').eq(0).within(() => {

      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();

      cy.get("app-autocomplete input").eq(0).clear({
        force: true
      });
      cy.get("app-autocomplete input").eq(0).blur({
        force: true
      });
    })
  })


  it('Documentos Buscador 360 - Tipo Procedimiento - filtro', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').eq(2).click();

    cy.get("app-autocomplete input").eq(1).type("a", {
      force: true
    });
    cy.get('form .formFilterGroup').eq(2).within(() => {

      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();

      cy.get("app-autocomplete input").eq(0).clear({
        force: true
      });
      cy.get("app-autocomplete input").eq(0).blur({
        force: true
      });
    })
  })


  it('Documentos Buscador 360 - Magistrado - filtro', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').eq(4).click();

    cy.get("app-autocomplete input").eq(2).type("j", {
      force: true
    });
    cy.get('form .formFilterGroup').eq(4).within(() => {

      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();
      cy.get("app-autocomplete form p").eq(random()).click();

      cy.get("app-autocomplete input").eq(0).clear({
        force: true
      });
      cy.get("app-autocomplete input").eq(0).blur({
        force: true
      });
    })
  })


  it('Documentos Buscador 360 - Fecha Tramitación - filtro', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').eq(1).click();
    cy.get('form .formFilterGroup').eq(1).within(() => {
      cy.get(".input_flexItem").eq(0).type("2019-12-03");
      cy.get(".input_flexItem").eq(1).type("2021-07-03");
      // cy.get(".input_flexItem").eq(0).click();
    });
  })


  it('Documentos Buscador 360 - Procedimiento nº / año - filtro', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').eq(3).click().then(()=>{
      
      cy.get('form .formFilterGroup').eq(3).within(() => {
        cy.get(".filter_common input").eq(0).type("546");
        cy.get(".filter_common input").eq(1).type("2020");
        
      });
      // cy.get('.filtrosSection').scrollTo(0, 0,{duration:1000,easing:"swing"});
    });
  })

  it('Documentos Buscador 360 - Uncollapse filtros individualmente', () => {
    Cypress.cy.wait(2000);

    cy.get('form .formFilterGroup > label').each((f, ind, list) => {
      cy.wrap(f).click();
      Cypress.cy.wait(500);
    })
  })


  it('Documentos Buscador 360 - Collapse / Uncollapse filtros Grupo', () => {
    Cypress.cy.wait(2000);

    cy.get('.collapsaBox p').click();

    Cypress.cy.wait(1000);

    cy.get('.collapsaBox p').click();
  })


  it('Documentos Buscador 360 - Minimal On / Off - Esconder Filtros', () => {
    Cypress.cy.wait(2000);

    cy.get('app-minimal p').click();

    Cypress.cy.wait(1000);

    cy.get('app-minimal p').click();
  })


  it('Documentos Buscador 360 - Limpiar Filtros', () => {
    Cypress.cy.wait(2000);

    cy.get('.clean_Filt p').click();

  })

  it('Documentos Buscador 360 - Mostar reset Filtros', () => {
    Cypress.cy.wait(2000);

    cy.get('.collapsaBox p').click();

    Cypress.cy.wait(2000);

    cy.get('.collapsaBox p').click();
  })





})
