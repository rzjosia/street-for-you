import { When } from "cypress-cucumber-preprocessor/steps";

When(`I click on {string}`, (value) => {
  cy.contains(value).first().click();
})