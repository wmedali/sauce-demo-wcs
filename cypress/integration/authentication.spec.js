/// <reference types="cypress" />

import { Login } from "../pages/login";
const users = require("../fixtures/users.json");

describe("Authentication Tests suite", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("should authenticate user with valid credentials", () => {
    //Login.login(users[0].username, users[0].password);
    cy.login(users[0].username, users[0].password);
    cy.url().should("contain", "/inventory");
    cy.get(".title").should("be.visible");
    cy.get(".inventory_item").should("exist");
  });

  it("should display error message for invalid password", () => {
    //Login.login(users[1].username, users[1].password);
    cy.login(users[1].username, users[1].password);

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display error message for invalid user", () => {
    //Login.login(users[2].username, users[2].password);
    cy.login(users[2].username, users[2].password);

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username and password do not match ");
  });

  it("should display specific error message for locked out user", () => {
    //Login.login(users[3].username, users[3].password);
    cy.login(users[3].username, users[3].password);

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
