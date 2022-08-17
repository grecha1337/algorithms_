import { baseUrl } from "./constant";
import { MAX_LENGTH_LIST } from "../../src/constants/constant";

describe("test stack page", () => {
  it("should be button disable if input empty", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-input-value"]`).invoke("val").should("be.empty");
    cy.get(`[data-testid="list-input-index"]`).invoke("val").should("be.empty");
    cy.get(`[data-testid="list-button-add-head"]`).should("be.disabled");
    cy.get(`[data-testid="list-button-add-tail"]`).should("be.disabled");
    cy.get(`[data-testid="list-button-add-by-index"]`).should("be.disabled");
    cy.get(`[data-testid="list-button-delete-by-index"]`).should("be.disabled");
  });

  it("render default list", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class*=circle_content]").should("have.length", MAX_LENGTH_LIST);
    cy.get("[class*=circle_content]").each((el, index) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");

      cy.wrap(el).find("[class*=circle_letter]").invoke("text").should("exist");
      if (index === 0) {
        cy.wrap(el).contains("head");
        cy.wrap(el).contains("tail").should("not.exist");
      } else if (index === MAX_LENGTH_LIST) {
        cy.wrap(el).contains("head").should("not.exist");
        cy.wrap(el).contains("tail");
      }
    });
  });

  it("add element in head", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-input-value"]`).type("111");
    cy.get(`[data-testid="list-button-add-head"]`).click();
    cy.get("[class*=circle_content]")
      .eq(0)
      .get("[class*=circle_small]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");
    cy.get("[class*=circle_content]")
      .eq(0)
      .get("[class*=circle_small]")
      .contains("111");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(600);
    cy.get("[class*=circle_content]").eq(0).contains("head");
    cy.get("[class*=circle_content]")
      .eq(0)
      .find("[class*=circle_circle]")
      .invoke("attr", "class")
      .should("contain", "circle_modified");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(600);
    cy.get("[class*=circle_content]").should(
      "have.length",
      MAX_LENGTH_LIST + 1
    );

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });

  it("add element in tail", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-input-value"]`).type("111");
    cy.get(`[data-testid="list-button-add-tail"]`).click();
    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST)
      .get("[class*=circle_small]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");
    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST)
      .get("[class*=circle_small]")
      .contains("111");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(600);
    cy.get("[class*=circle_content]").eq(MAX_LENGTH_LIST).contains("tail");
    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST)
      .find("[class*=circle_circle]")
      .invoke("attr", "class")
      .should("contain", "circle_modified");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(600);
    cy.get("[class*=circle_content]").should(
      "have.length",
      MAX_LENGTH_LIST + 1
    );

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });

  it("add element by index", () => {
    const index = 2;

    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-input-value"]`).type("111");
    cy.get(`[data-testid="list-input-index"]`).type(index);
    cy.get(`[data-testid="list-button-add-by-index"]`).click();

    for (let i = 0; i <= index; i++) {
      cy.get("[class*=circle_content]")
        .eq(i)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_changing");

      cy.get("[class*=circle_content]")
        .eq(i)
        .find("[class*=circle_circle]")
        .contains("111");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
    }

    cy.get("[class*=circle_content]")
      .eq(index)
      .find("[class*=circle_circle]")
      .invoke("attr", "class")
      .should("contain", "circle_modified");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get("[class*=circle_content]").should(
      "have.length",
      MAX_LENGTH_LIST + 1
    );

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });

    cy.get("[class*=circle_content]")
      .eq(index)
      .find("[class*=circle_circle]")
      .contains("111");
  });

  it("delete head element", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-button-delete-head"]`).click();

    cy.get("[class*=circle_content]")
      .eq(0)
      .get("[class*=circle_small]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");

    cy.get("[class*=circle_content]").should(
      "have.length",
      MAX_LENGTH_LIST - 1
    );

    cy.get("[class*=circle_content]").eq(0).contains("head");

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });

  it("delete tail element", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get(`[data-testid="list-button-delete-tail"]`).click();

    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST)
      .get("[class*=circle_small]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");

    cy.get("[class*=circle_content]").should(
      "have.length",
      MAX_LENGTH_LIST - 1
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST - 2)
      .contains("tail");

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });

  it("delete element by index", () => {
    const index = 2;
    cy.visit(`${baseUrl}/list`);

    cy.get(`[data-testid="list-input-index"]`).type(index);
    cy.get(`[data-testid="list-button-delete-by-index"]`).click();

    for (let i = 0; i <= index; i++) {
      cy.get("[class*=circle_content]")
        .eq(i)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_changing");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
    }

    cy.get("[class*=circle_content]")
      .eq(index)
      .get("[class*=circle_small]")
      .invoke("attr", "class")
      .should("contain", "circle_changing");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get("[class*=circle_content]")
      .eq(MAX_LENGTH_LIST - 2)
      .contains("tail");

    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=circle_circle]")
        .invoke("attr", "class")
        .should("contain", "circle_default");
    });
  });
});
