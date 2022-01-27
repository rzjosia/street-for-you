import { Then } from "cypress-cucumber-preprocessor/steps";

Then('I should see {string}', (message) => {
  cy.contains(message);
})