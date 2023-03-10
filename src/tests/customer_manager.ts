import {Given, When, Then, DataTable} from "@badeball/cypress-cucumber-preprocessor";

const dataRowSelector = ".mat-table tbody";

function submitCustomerForm(data: string[]) {
  cy.get('customer #firstName').clear().type(data[0])
    .get('customer #lastName').clear().type(data[1])
    .get('customer #email').clear().type(data[2])
    .get('customer #phoneNumber').clear().type(data[3])
    .get('customer #bankAccountNumber').clear().type(data[5])
    .wait(300)
    .get('customer button[type="submit"]').click();
}

Given('system error codes are following', (table: DataTable) => {
  const expected = [
    ["Code", "Description"],
    ["101", "Invalid Mobile Number"],
    ["102", "Invalid Email address"],
    ["103", "Invalid Bank Account Number"],
    ["201", "Duplicate customer by First-name, Last-name, Date-of-Birth"],
    ["202", "Duplicate customer by Email address"],
  ];
  assert.deepEqual(table.raw(), expected);
});

Given('platform has {int} customers', (rowCount) => {
  cy.visit("http://192.168.1.100:4200");
  cy.get(dataRowSelector).find('tr').should('have.length', rowCount);
});

When(/^user creates a customer with following data by sending 'Create Customer Command'$/, (table: DataTable) => {
  cy.get('#addCustomer').click();
  submitCustomerForm(table.rows()[0]);
  cy.wait(300);
});

Then(/^user can lookup all customers and filter by below properties and get (\d+) records$/, (rowCount, d: DataTable) => {
  const row = d.rows()[0];
  const firstName = row[0];
  // here we check if first cell of table contains first name, not a good practice, needs improvement
  cy.get(dataRowSelector).find('tr').contains(firstName).should('have.length', rowCount);
});

When('user edit customer with new data', (table: DataTable) => {
  const row = table.rows()[0];
  cy.get(".mat-icon-button.edit").click();
  submitCustomerForm(row);
});

Then(/^user must receive error code of (\d+)$/, (errorCode: string) => {
  cy.get('.error').contains(errorCode, {matchCase: false});
  cy.get("body").click();
});

When(/^user delete customer by Email of "([^"]*)"$/, (email: string) => {
  cy.get(dataRowSelector).find('tr').contains("td.cdk-column-email", email).parent()
    .get('.mat-icon-button.delete').click();
});

Then(/^user can get all records and get (\d+) records$/, (rowCount: number) => {
  cy.get(dataRowSelector).find('tr').should('have.length', rowCount);
});

// concerns:
// should read more about best practices to use and maintain element selectors within a page in order to make tests less fragile to layout changes?
// should make dialogs url-friendly, open and close them via url hashtag?
// should convert DataTable to a better format, array of objects with corresponding keys and values?
