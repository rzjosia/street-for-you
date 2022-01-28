import { Then } from "cypress-cucumber-preprocessor/steps";

Then('I should see {string} in alert error', (errorMessage) => {
  cy.getAlertError(errorMessage);
})