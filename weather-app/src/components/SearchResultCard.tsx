import { AppSearchResult } from "../types/types";
import AddFavorite from "./AddFavorite";

type Props = {
  searchResult: AppSearchResult;
  index: number;
};

const formatSearchResult = (searchResult: AppSearchResult): string => {
  const segments = [searchResult.city, searchResult.country, searchResult.state].filter(Boolean);
  return segments.join(", ");
};

const SearchResultCard = ({ searchResult, index }: Props) => {
  const handleClick = () => {};
  return (
    <div className="relative flex border border-gray-500 justify-between items-center hover:bg-gray-100 cursor-pointer">
      <li key={index} data-testid="search-results" className="text-lg text-left pl-">
        {formatSearchResult(searchResult)}
      </li>
      <AddFavorite onClick={handleClick}></AddFavorite>
    </div>
  );
};

export default SearchResultCard;
