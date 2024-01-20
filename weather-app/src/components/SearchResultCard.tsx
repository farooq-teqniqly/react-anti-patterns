import { AppSearchResult } from "../types/types";

type Props = {
  searchResult: AppSearchResult;
  index: number;
};

const formatSearchResult = (searchResult: AppSearchResult): string => {
  const segments = [searchResult.city, searchResult.country, searchResult.state].filter(Boolean);
  return segments.join(", ");
};

const SearchResultCard = ({ searchResult, index }: Props) => {
  return (
    <li
      key={index}
      data-testid="search-results"
      className="border border-gray-500 text-lg text-left pl-2 hover:bg-gray-100"
    >
      {formatSearchResult(searchResult)}
    </li>
  );
};

export default SearchResultCard;
