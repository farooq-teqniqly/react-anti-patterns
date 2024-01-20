import { render, screen } from "@testing-library/react";
import FavoriteCityCard from "./FavoriteCityCard";
import { FavoriteCity } from "../types/types";

describe("FavoriteCityCard component", () => {
  it("Renders the city, state, and country", () => {
    const city: FavoriteCity = {
      name: "Seattle",
      country: "US",
      state: "WA",
    };
    render(<FavoriteCityCard city={city}></FavoriteCityCard>);

    expect(screen.getByText(city.name)).toBeInTheDocument();
    expect(screen.getByText(city.country)).toBeInTheDocument();
    expect(screen.getByText(city.state!)).toBeInTheDocument();
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
});
