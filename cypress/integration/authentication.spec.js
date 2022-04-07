/// <reference types="cypress" />

const users = require("../fixtures/users.json");

describe("Authentication Tests suite", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("should authenticate user with valid credentials", () => {
    cy.get('[data-test="username"]').type(users[0].username);
    cy.get('[data-test="password"]').type(users[0].password);
    cy.get('[data-test="login-button"]').click();

    cy.url().should("contain", "/inventory");
    cy.get(".title").should("be.visible");
    cy.get(".inventory_item").should("exist");
  });

  it("should display error message for invalid password", () => {
    cy.get('[data-test="username"]').type(users[1].username);
    cy.get('[data-test="password"]').type(users[1].password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display error message for invalid user", () => {
    cy.get('[data-test="username"]').type(users[2].username);
    cy.get('[data-test="password"]').type(users[2].password);
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display specific error message for locked out user", () => {
    cy.get('[data-test="username"]').type(users[3].username);
    cy.get('[data-test="password"]').type(users[3].password);
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
