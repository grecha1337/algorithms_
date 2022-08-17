import { baseUrl } from "./constant";

const queue = [11, 22];

describe("test stack page", () => {
  it("should be button disable if input empty", () => {
    cy.visit(`${baseUrl}/queue`);
    cy.get(`[data-testid="input-queue"]`).invoke('val').should('be.empty')
    cy.get(`[data-testid="button-queue-add"]`).should("be.disabled");
  });

  it("add element in queue", () => {
    cy.get(`[data-testid="input-queue"]`).type(queue[0]);
    cy.get(`[data-testid="button-queue-add"]`).click();

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 0) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_changing");
        cy.wrap(el).contains("tail");
        cy.wrap(el).contains("head");
      } else {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("tail").should("not.exist");
        cy.wrap(el).contains("head").should("not.exist");
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });

    cy.get(`[data-testid="input-queue"]`).type(queue[1]);
    cy.get(`[data-testid="button-queue-add"]`).click();

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 1) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_changing");

        cy.wrap(el).contains("head").should("not.exist");
        cy.wrap(el).contains("tail");
        cy.wrap(el).contains(queue[index]);
      } else if (index === 0) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("head");
        cy.wrap(el).contains("tail").should("not.exist");
        cy.wrap(el).contains(queue[index]);
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[class*=circle_content]").each((el, index) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
      if (index > 2) {
        cy.wrap(el).should("have.value", "");
      }
    });
  });

  it("delete element in queue", () => {
    cy.get(`[data-testid="button-queue-delete"]`).click();

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 0) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_changing");

        cy.wrap(el).contains("head");
        cy.wrap(el).contains("tail").should("not.exist");
        cy.wrap(el).contains(queue[index]);
      } else if (index === 1) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("head").should("not.exist");
        cy.wrap(el).contains("tail");
        cy.wrap(el).contains(queue[index]);
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get("[class*=circle_content]").each((el, index) => {
      if (index === 1) {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).contains("head");
        cy.wrap(el).contains("tail");
        cy.wrap(el).contains(queue[index]);
      } else {
        cy.wrap(el)
          .find("[class*=circle_circle]")
          .invoke("attr", "class")
          .should("contain", "circle_default");
        cy.wrap(el).should("have.value", "");
        cy.wrap(el).contains(`${queue[index]}`).should("not.exist");
      }
    });
  });

  it('clear queue', ()=> {
    cy.get(`[data-testid="button-queue-clear"]`).click();
    cy.get("[class*=circle_content]").each((el, index) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
      cy.wrap(el).should("have.value", "");
      cy.wrap(el).contains(`${queue[index]}`).should("not.exist");
      cy.get(`[data-testid="button-queue-add"]`).should("be.disabled");
  });

  })

});
