import FavoriteCityCard from "./FavoriteCityCard";
import { FavoriteCity } from "../types/types";

const city: FavoriteCity = {
  name: "Seattle",
  country: "US",
  state: "Washington",
  lat: 47.6038321,
  long: -122.330062,
  weather: {
    temp: 47.25,
  },
};

describe("FavoriteCityCard component", () => {
  it("Renders the city, state, country, and temp", () => {
    cy.mount(<FavoriteCityCard city={city} />);

    const pElements: any = cy.get("p");
    cy.contains(pElements[0], city.name);
    cy.contains(pElements[1], `${city.state}, ${city.country}`);
    cy.contains(city.weather!.temp);
  });

  it("Doesn't render the state if missing", () => {
    const cityNoState = { ...city };
    delete cityNoState.state;

    cy.mount(<FavoriteCityCard city={cityNoState} />);

    const pElements: any = cy.get("p");
    cy.contains(pElements[1], city.country);
  });
});
