import SearchResultCard from "./SearchResultCard";
import { AppSearchResult } from "../types/types";
import { render, screen } from "@testing-library/react";

describe("SearchResultCard component", () => {
  it("Does not render the state if there isn't any", () => {
    const searchResult: AppSearchResult = {
      city: "Dublin",
      country: "IE",
      lat: 10.123,
      long: 9.888,
    };

    render(<SearchResultCard searchResult={searchResult}></SearchResultCard>);
    expect(screen.getByText("Dublin, IE")).toBeInTheDocument();
  });
});
