import { RouteHandler } from "cypress/types/net-stubbing";
import searchResults from "../fixtures/search-result.json";
import weather from "../fixtures/weather.json";

const localAppUrl = "http://localhost:3000";

const interceptMap: { [key: string]: any } = {
  GEO: {
    method: "GET",
    ep: "https://api.openweathermap.org/geo/1.0/direct?q=*",
  },
  WEATHER: {
    method: "GET",
    ep: "https://api.openweathermap.org/data/2.5/weather*",
  },
};

const intercept = (interceptMapKey: string, response: RouteHandler) => {
  const interceptMapEntry = interceptMap[interceptMapKey];
  cy.intercept(interceptMapEntry.method, interceptMapEntry.ep, response);
};

describe("Weather app", () => {
  beforeEach(() => {
    cy.visitApp(localAppUrl);

    intercept("GEO", {
      statusCode: 200,
      body: searchResults,
    });

    intercept("WEATHER", {
      statusCode: 200,
      body: weather,
    });
  });

  it("Displays the title", () => {
    cy.contains("Weather App");
  });

  it("Displays a welcome message on initial load", () => {
    cy.contains("Welcome to Weather App! Start by searching for a city.");
  });

  it("Does not show the no search results found message on initial load", () => {
    cy.get('[data-testid="no-search-results-message"]').should("not.exist");
  });

  it("Displays search results", () => {
    const searchCity = "Seattle";

    cy.searchCity(searchCity);

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

    cy.searchCity(searchCity);
    cy.contains("Sorry, but we could not find that city.");
  });

  it("Does not show the welcome message after a search is performed", () => {
    const searchCity = "Seattle";

    cy.searchCity(searchCity);
    cy.get('[data-testid="welcome-message"]').should("not.exist");
  });

  it("Can favorite multiple cities", () => {
    const searchCity = "Seattle";

    cy.searchCity(searchCity);

    searchResults.forEach((r, index) => {
      cy.addFavorite(index);
    });

    cy.get('[data-testid="favorite-city"]').should("have.length", 3);
  });

  it("Does not allow favoriting of the same city twice", () => {
    const searchCity = "Seattle";

    cy.searchCity(searchCity);
    cy.addFavorite(0);

    cy.get('[data-testid="favorite-city"]').should("have.length", 1);
  });

  it("Displays the rounded temperature for a favorite", () => {
    const searchCity = "Seattle";

    cy.searchCity(searchCity);
    cy.addFavorite(0);
    cy.contains(/^48$/);
  });

  it("Displays N/A for the temp when it can't be retrieved", () => {
    const searchCity = "Seattle";

    intercept("WEATHER", {
      statusCode: 200,
      body: null,
    });

    cy.searchCity(searchCity);
    cy.addFavorite(0);
    cy.contains("N/A");
  });
});
