import { ChangeEvent, useState, KeyboardEvent } from "react";
import { SearchResult } from "../types/types";

const getSearchEnpoint = (city: string): string => {
  return `https://api.openweathermap.org/geo/1.0/direct?q='${city}'&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
};
const HomePage = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showNoSearchResultsMessage, setShowNoSearchResultsMessage] = useState<boolean>(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);

  const formatSearchResult = (searchResult: SearchResult): string => {
    const segments = [searchResult.name, searchResult.country, searchResult.state].filter(Boolean);
    return segments.join(", ");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    fetchSearchResults();
  };

  const fetchSearchResults = () => {
    fetch(getSearchEnpoint(searchCity))
      .then((res) => res.json())
      .then((cities: SearchResult[]) => {
        setSearchResults(cities);
        setShowNoSearchResultsMessage(cities.length === 0);
        setShowWelcomeMessage(false);
      });
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-bol pb-4">Weather App</h1>
      <input
        type="text"
        data-testid="search-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border border-black pl-2 h-12 mb-4"
      />
      {showWelcomeMessage && (
        <h2 data-testid="welcome-message" className="pt-4">
          Welcome to Weather App! Start by searching for a city.
        </h2>
      )}

      {showNoSearchResultsMessage && (
        <h2 data-testid="no-search-results-message">Sorry, but we could not find that city.</h2>
      )}
      {searchResults.length > 0 && (
        <ul className="">
          {searchResults.map((r, index) => (
            <li
              key={index}
              data-testid="search-results"
              className="border border-gray-500 text-lg text-left pl-2 hover:bg-gray-100"
            >
              {formatSearchResult(r)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
