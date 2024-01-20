import SearchResultCard from "./SearchResultCard";
import { RemoteSearchResult } from "../types/types";
import { render, screen } from "@testing-library/react";

describe("SearchResultCard component", () => {
  it("Does not render the state if there isn't any", () => {
    const searchResult: RemoteSearchResult = {
      name: "Dublin",
      country: "IE",
    };

    render(<SearchResultCard searchResult={searchResult} index={0}></SearchResultCard>);
    expect(screen.getByText("Dublin, IE")).toBeInTheDocument();
  });
});
