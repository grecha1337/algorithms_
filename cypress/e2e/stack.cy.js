import { baseUrl } from "./constant";

describe("test stack page", () => {
  it("should be button disable if input empty", () => {
    cy.visit(`${baseUrl}/stack`);
    cy.get(`[data-testid="input-stack"]`).invoke('val').should('be.empty')
    cy.get(`[data-testid="button-stack-add"]`).should("be.disabled");
  });

  it("add new element in stack", () => {
    cy.get(`[data-testid="input-stack"]`).type("1");
    cy.get(`[data-testid="button-stack-add"]`).click();

    cy.get("[class*=circle_circle]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(250);
    cy.get("[class*=circle_default")
      .invoke("attr", "class")
      .should("contain", "circle_default");

    cy.get("[class*=circle_content]").should("have.length", 1);
    cy.get("[class*=circle_content").contains("top");

    cy.get(`[data-testid="input-stack"]`).type("2");
    cy.get(`[data-testid="button-stack-add"]`).click();

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 1) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_changing");
        cy.wrap(el).contains("2");
      } else if (index === 0) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("1");
      }
    });
    cy.get("[class*=circle_content]").should("have.length", 2);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(250);
    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });

  it("delete element in stack", () => {
    cy.get(`[data-testid="button-stack-delete"]`).click();

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 1) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_changing");
        cy.wrap(el).contains("2");
      } else if (index === 0) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("1");
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[class*=circle_content]").should("have.length", 1);
  });

  it("clear stack", () => {
    cy.get(`[data-testid="button-stack-delete"]`).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[class*=circle_content]").should("have.length", 0);
  });
});
