import SearchResultCard from "./SearchResultCard";
import { AppSearchResult } from "../types/types";
import { render, screen } from "@testing-library/react";

describe("SearchResultCard component", () => {
  it("Does not render the state if there isn't any", () => {
    const searchResult: AppSearchResult = {
      city: "Dublin",
      country: "IE",
    };

    render(<SearchResultCard searchResult={searchResult}></SearchResultCard>);
    expect(screen.getByText("Dublin, IE")).toBeInTheDocument();
  });
});
