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
let credentials={
  authenticationDefaultSystem: "dameToken",
  globalCredentialsData: "1c3ae980f4cf17550f087480ca785370be90f603448a171504f4c18515fe0cc5d28d6592b4a1cd48889e26446d6829959e9942f943bde3466b9d89f0861ad110d96c82861954d5c753e2833aa2215876614ee0cf03bb9cdf5e9f895861f3b7f3cd7160acc03022fdb62fd915da60a40cde529ff992238816857a87b34361f0fac44f1266363b514a9969cf1bc37c165f45d15aec69319d6e9c88628142c22ba3928d3216acb417cc995df8491d838f1f2ea597604ed66d8fd0b80cc125fe68522bbb9a1cf0aecde5107be37185e29147181e7042723b0af28da3e9c6d994833c332017042f7aaa03b7667a3f7a4efb12ff9cec85f71e"
}
// localStorage.setItem()
describe('Inicio Buscador 360 - Login', () => {
  // beforeEach(() => {
  //   // Cypress starts out with a blank slate for each test
  //   // so we must tell it to visit our website with the `cy.visit()` command.
  //   // Since we want to visit the same URL at the start of all our tests,
  //   // we include it in our beforeEach function so that it runs before each test
  // })

  // cy.saveLocalStorage();


  // before(() => {
  //   cy.saveLocalStorage();
  //   cy.restoreLocalStorage();
  //   // cy.visit("/");
  // });

  // after(() => {
  //   cy.saveLocalStorage();
  // });
  beforeEach(() => {
    // cy.restoreLocalStorage();
    cy.setLocalStorage("MOVA_MOV_PLANTILLA", JSON.stringify(credentials) )
  })
  afterEach(() => {
    cy.saveLocalStorage()
  });

  // it("localSorage", () => {
  //   it("set Local Storage",() => {
      
  //   })
  // })


  it('Login', () => {
    // cy.request({
    //   url:"https://desesb.madrid.org/fesb_rest_token/v1/token/getToken",
    //   method:"POST",
    //   body: {
    //     usuario: "BJUSUSU1",
    //     password: "bjususu1",
    //     moduloTecnico: "BJUS",
    //     informacionAdicional: {},
    //     tokenUnUso: "N",
    //     sistemaAutenticacion: "IntranetJusDA",
    //     minutosTiempoValidez: 10080
    // }
    // })
    // .its("body")
    // .then((res)=>{
    //   cy.log(res);
    //   localStorage.setItem("MOVA_MOV_PLANTILLA",{
    //     authenticationDefaultSystem: "dameToken",
    //     globalCredentialsData: "1c3ae980f4cf17550f087480ca785370be90f603448a171504f4c18515fe0cc5d28d6592b4a1cd48889e26446d6829959e9942f943bde3466b9d89f0861ad110d96c82861954d5c753e2833aa2215876614ee0cf03bb9cdf5e9f895861f3b7f3cd7160acc03022fdb62fd915da60a40cde529ff992238816857a87b34361f0fac44f1266363b514a9969cf1bc37c165f45d15aec69319d6e9c88628142c22ba3928d3216acb417cc995df8491d838f1f2ea597604ed66d8fd0b80cc125fe68522bbb9a1cf0aecde5107be37185e29147181e7042723b0af28da3e9c6d994833c332017042f7aaa03b7667a3f7a4efb12ff9cec85f71e"
    // })
    // });

    cy.visit('localhost:4200/#/documentos');
    // Cypress.cy.wait(2000)
    // cy.get("input").eq(0).type("BJUSUSU1");
    // cy.get("input").eq(1).type("bjususu1");
    // cy.get("input").eq(2).check({
    //   force: true
    // });
    // cy.get("button").eq(5).click();

    // cy.get('.section-menu > .mat-icon').click();

  })
  it('Documentos Buscador 360 - Hide SideBar', () => {
    Cypress.cy.wait(2000)


    cy.get('.section-menu > .mat-icon').click();

  })





})
