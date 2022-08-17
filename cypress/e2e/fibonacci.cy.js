import { baseUrl } from "./constant";

const expectedFib = ["1", "1", "2", "3", "5"];

describe("test fibonacci page", () => {
  it("should be button disable if input empty", () => {
    cy.visit(`${baseUrl}/fibonacci`);
    cy.get(`[data-testid="input-fibonacci"]`).invoke('val').should('be.empty')
    cy.get(`[data-testid="button-fibonacci"]`).should("be.disabled");
  });

  it("should be gen fibonacci correct", () => {
    cy.get(`[data-testid="input-fibonacci"]`).type("4");
    cy.get(`[data-testid="button-fibonacci"]`).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[class*=circle_circle]").each((el, index) => {
      cy.wrap(el).contains(expectedFib[index])
    });
  });
});
