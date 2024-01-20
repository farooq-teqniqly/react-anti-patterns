import SearchResultCard from "./SearchResultCard";
import { SearchResult } from "../types/types";
import { render, screen } from "@testing-library/react";

describe("SearchResultCard component", () => {
  it("Does not render the state if there isn't any", () => {
    const searchResult: SearchResult = {
      name: "Dublin",
      country: "IE",
    };

    render(<SearchResultCard searchResult={searchResult} index={0}></SearchResultCard>);
    expect(screen.getByText("Dublin, IE")).toBeInTheDocument();
  });
});
