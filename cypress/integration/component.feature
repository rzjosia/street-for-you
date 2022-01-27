Feature: Component

  Background: Homepage
    Given I go to homepage

  Scenario: Title and search bar
    Given Title should be "Street for you"
    Then I should see "Lille" in placeholder search field
  
  Scenario: Show add marker error
    When I add a marker without type of place
    Then I should see "Oups ! La situation est requise pour ajouter un lieu" in alert error
