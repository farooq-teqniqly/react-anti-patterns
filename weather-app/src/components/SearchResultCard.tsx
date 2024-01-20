import { AppSearchResult } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

type Props = {
  searchResult: AppSearchResult;
  handleClick?: () => void;
};

const formatSearchResult = (searchResult: AppSearchResult): string => {
  const segments = [searchResult.city, searchResult.country, searchResult.state].filter(Boolean);
  return segments.join(", ");
};

const SearchResultCard = ({ searchResult, handleClick }: Props) => {
  return (
    <div className="relative flex border border-gray-500 justify-between items-center hover:bg-gray-100 cursor-pointer">
      <li data-testid="search-results" className="text-lg text-left pl-">
        {formatSearchResult(searchResult)}
      </li>
      <FontAwesomeIcon
        data-testid="add-favorite"
        icon={faStar}
        className="pr-4"
        onClick={handleClick}
      ></FontAwesomeIcon>
    </div>
  );
};

export default SearchResultCard;
