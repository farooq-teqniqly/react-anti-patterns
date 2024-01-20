import { ChangeEvent, useState, KeyboardEvent } from "react";
import { SearchResult } from "../types/types";

const getSearchEnpoint = (city: string): string => {
  return `https://api.openweathermap.org/geo/1.0/direct?q='${city}'&limit=5&appid=0bfd9c8ec382ac598e201a033426f6ef`;
};
const HomePage = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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
      });
  };
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        data-testid="search-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((r, index) => (
            <li key={index} data-testid="search-results">
              {r.name}, {r.country}, {r.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
