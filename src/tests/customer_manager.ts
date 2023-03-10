import {Given, When, Then, DataTable} from "@badeball/cypress-cucumber-preprocessor";

Given('system error codes are following', (table: DataTable) => {
  const expected = [
    ["Code", "Description"],
    ["101" , "Invalid Mobile Number"],
    ["102",  "Invalid Email address"],
    ["103","Invalid Bank Account Number"],
    ["201", "Duplicate customer by First-name, Last-name, Date-of-Birth"],
    ["202",  "Duplicate customer by Email address"],
  ];
  assert.deepEqual(table.raw(), expected);
});

Given('platform has "0" customers', () => {
  assert.deepEqual(true, true);
});

When("user creates a customer with following data by sending 'Create Customer Command'", () => {
  cy.visit("http://192.168.1.100:4200");
  cy.get('.mat-icon-button').click();
  cy.get('.mat-dialog-content #firstName').type('saeed');
});

Then("I should see a search bar", () => {
  cy.get("input").should(
    "have.attr",
    "placeholder",
    "Search the web without being tracked"
  );
});
