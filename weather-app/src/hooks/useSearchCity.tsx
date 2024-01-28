import { useState } from "react";
import { AppSearchResult, RemoteSearchResult, mapRemoteSearchResults } from "../types/types";

const getSearchEndpoint = (city: string): string => {
  return `https://api.openweathermap.org/geo/1.0/direct?q='${city}'&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
};

const useSearchCity = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<AppSearchResult[]>([]);

  const fetchSearchResults = async () => {
    const response = await fetch(getSearchEndpoint(searchCity));
    const cities: RemoteSearchResult[] = await response.json();

    setSearchResults(mapRemoteSearchResults(cities));
  };

  return {
    fetchSearchResults,
    setSearchCity,
    searchResults,
  };
};

export { useSearchCity };
