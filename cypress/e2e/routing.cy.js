import { baseUrl } from "./constant";

const routs = [
 'recursion',
 'fibonacci',
 'sorting',
 'stack',
 'queue',
 'list'
]

describe("route", () => {
  it("route", () => {
    routs.forEach((rout) => {
      cy.visit(`${baseUrl}/${rout}`)
      cy.location("pathname").should("eq", `/${rout}`);
      cy.get(`a[href="/"]`).click();
    });
  });
});
