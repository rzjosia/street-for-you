import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`I should see {string} in the title`, (title) => {
  cy.title().should('include', title)
})