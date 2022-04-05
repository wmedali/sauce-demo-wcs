/// <reference types="cypress" />

describe("Authentication Tests suite", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("should authenticate user with valid credentialds", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("contain", "/inventory");
    cy.get(".title").should("be.visible");
    cy.get(".inventory_item").should("exist");
  });

  it("should display error message for invalid password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_david");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display error message for invalid user", () => {
    cy.get('[data-test="username"]').type("standardfsdfsqr");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display specific error message for locked out user", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("include.text", "this user has been locked out");
  });

  it("should close the error message", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("include.text", "Username is required");
    cy.get(".error-button").click();
    cy.get('[data-test="error"]').should("not.exist");
  });
});
