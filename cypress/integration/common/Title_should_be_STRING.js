import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`Title should be {string}`, (title) => {
  cy.title().should('eq', title)
})