import { RouteHandler } from "cypress/types/net-stubbing";
import searchResults from "../fixtures/search-result.json";

const localAppUrl = "http://localhost:3000";

const interceptMap: { [key: string]: any } = {
  GEO: {
    method: "GET",
    ep: "https://api.openweathermap.org/geo/1.0/direct?q=*",
  },
};

const intercept = (interceptMapKey: string, response: RouteHandler) => {
  const interceptMapEntry = interceptMap[interceptMapKey];
  cy.intercept(interceptMapEntry.method, interceptMapEntry.ep, response);
};

describe("Weather app", () => {
  it("Displays the title", () => {
    cy.visit(localAppUrl);
    cy.contains("Weather App");
  });

  it("Searches for a city", () => {
    intercept("GEO", {
      statusCode: 200,
      body: searchResults,
    });
    cy.visit(localAppUrl);
    cy.get('[data-testid="search-input"]').type("Seattle");
    cy.get('[data-testid="search-input"]').type("{enter}");
    cy.get('[data-testid="search-results"]').should("have.length", 3);
  });
});
