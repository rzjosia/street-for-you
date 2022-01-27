import { Then, When } from "cypress-cucumber-preprocessor/steps";

Then("I should see {string} in placeholder search field", (city) => {
    cy.get("#city").should('have.attr', 'placeholder', city);
});

When("I add a marker without type of place", () => {
    cy.clickOnMaps();
    cy.get("[role='dialog']").should('have.attr', 'aria-modal', "true");
    cy.get("[role='dialog']").contains("button", "Annuler");
    cy.get("[role='dialog']").contains("button", "Ajouter")
        .first()
        .click();
})

