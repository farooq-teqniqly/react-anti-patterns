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

  it("Displays a welcome message on initial load", () => {
    cy.visit(localAppUrl);
    cy.contains("Welcome to Weather App! Start by searching for a city.");
  });

  it("Does not show the no search results found message on initial load", () => {
    cy.visit(localAppUrl);
    cy.get('[data-testid="no-search-results-message"]').should("not.exist");
  });

  it("Displays search results", () => {
    const searchCity = "Seattle";

    intercept("GEO", {
      statusCode: 200,
      body: searchResults,
    });

    cy.visit(localAppUrl);
    cy.get('[data-testid="search-input"]').type(searchCity);
    cy.get('[data-testid="search-input"]').type("{enter}");

    searchResults.forEach((r, index) => {
      cy.get('[data-testid="search-results"]')
        .eq(index)
        .should("have.text", `${r.name}, ${r.country}, ${r.state}`);
    });
  });

  it("Displays a not found message when the city isn't found", () => {
    const searchCity = "Balhblahblah";

    intercept("GEO", {
      statusCode: 200,
      body: [],
    });

    cy.visit(localAppUrl);
    cy.get('[data-testid="search-input"]').type(searchCity);
    cy.get('[data-testid="search-input"]').type("{enter}");
    cy.contains("Sorry, but we could not find that city.");
  });

  it("Does not show the welcome message after a search is performed", () => {
    const searchCity = "Seattle";

    intercept("GEO", {
      statusCode: 200,
      body: searchResults,
    });

    cy.visit(localAppUrl);
    cy.get('[data-testid="search-input"]').type(searchCity);
    cy.get('[data-testid="search-input"]').type("{enter}");
    cy.get('[data-testid="welcome-message"]').should("not.exist");
  });

  it("Formats the search result properly when there is no state", () => {
    const searchCity = "Seattle";

    intercept("GEO", {
      statusCode: 200,
      body: [
        {
          name: "Dublin",
          country: "IE",
        },
      ],
    });

    cy.visit(localAppUrl);
    cy.get('[data-testid="search-input"]').type(searchCity);
    cy.get('[data-testid="search-input"]').type("{enter}");
    cy.get('[data-testid="search-results"]').eq(0).should("have.text", "Dublin, IE");
  });
});
