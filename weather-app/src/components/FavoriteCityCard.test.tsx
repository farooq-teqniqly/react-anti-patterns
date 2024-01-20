import { render, screen } from "@testing-library/react";
import FavoriteCityCard from "./FavoriteCityCard";
import { FavoriteCity } from "../types/types";

describe("FavoriteCityCard component", () => {
  it("Renders the city, state, and country", () => {
    const city: FavoriteCity = {
      name: "Seattle",
      country: "US",
      state: "Washington",
    };
    render(<FavoriteCityCard city={city}></FavoriteCityCard>);
    expect(screen.getByText(`${city.state!}, ${city.country}`)).toBeInTheDocument();
  });

  it("Doesn't render the state if it's missing", () => {
    const city: FavoriteCity = {
      name: "Dublin",
      country: "IE",
    };
    render(<FavoriteCityCard city={city}></FavoriteCityCard>);

    expect(screen.getByText(city.name)).toBeInTheDocument();
    expect(screen.getByText(city.country)).toBeInTheDocument();
  });

  it("Renders the weather", () => {
    const city: FavoriteCity = {
      name: "Seattle",
      country: "US",
      state: "Washington",
      weather: {
        temp: 48,
      },
    };
    render(<FavoriteCityCard city={city}></FavoriteCityCard>);

    expect(screen.getByText(new RegExp(`\\b${city.weather?.temp}\\b`))).toBeInTheDocument();
  });
});
