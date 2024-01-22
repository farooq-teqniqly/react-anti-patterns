import { AppSearchResult } from "../types/types";
import SearchResultCard from "./SearchResultCard";

const searchResult: AppSearchResult = {
  city: "Seattle",
  country: "US",
  state: "Washington",
  lat: 47.6038321,
  long: -122.330062,
};

describe("SearchResultCard component", () => {
  it("Renders the city, state, and country", () => {
    cy.mount(<SearchResultCard searchResult={searchResult} />);
    const { city, country, state } = searchResult;
    cy.get('[data-testid="search-results"]').should("have.text", `${city}, ${country}, ${state}`);
  });

  it("Doesn't render the state if it's missing", () => {
    const searchResultNoState = { ...searchResult };
    delete searchResultNoState.state;

    cy.mount(<SearchResultCard searchResult={searchResultNoState} />);
    const { city, country } = searchResultNoState;
    cy.get('[data-testid="search-results"]').should("have.text", `${city}, ${country}`);
  });

  it("Renders the star icon", () => {
    cy.mount(<SearchResultCard searchResult={searchResult} />);
    cy.get("svg").should("have.class", "fa-star");
  });
});
