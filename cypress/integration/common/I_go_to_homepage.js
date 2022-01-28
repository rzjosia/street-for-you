import { When } from "cypress-cucumber-preprocessor/steps";

When("I go to homepage", () => {
    cy.visit('/');
});