import { baseUrl } from "./constant";

describe("test revers page", () => {
  it("should be button disable if input empty", () => {
    cy.visit(`${baseUrl}/recursion`);
    cy.get(`[data-testid="input-revers"]`).invoke('val').should('be.empty')
    cy.get(`[data-testid="button-revers"]`).should("be.disabled");
  });

  it("should be revers string correct", () => {
    cy.get(`[data-testid="input-revers"]`).type("123");
    cy.get(`[data-testid="button-revers"]`).click();

    cy.get("[class*=circle_circle]").each((el) => {
      cy.wrap(el).invoke("attr", "class").should("contain", "circle_default");
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get("[class*=circle_circle]").each((el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap(el)
          .invoke("attr", "class")
          .should("contain", "circle_changing");
      } else {
        cy.wrap(el).invoke("attr", "class").should("contain", "circle_default");
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get("[class*=circle_circle]").each((el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap(el)
          .invoke("attr", "class")
          .should("contain", "circle_modified");
      } else if (index === 1) {
        cy.wrap(el)
          .invoke("attr", "class")
          .should("contain", "circle_changing");
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get("[class*=circle_circle]").each((el, index) => {
      cy.wrap(el)
          .invoke("attr", "class")
          .should("contain", "circle_modified");
    });
  });
});
