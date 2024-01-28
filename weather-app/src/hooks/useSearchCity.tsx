import { useState } from "react";
import { AppSearchResult, RemoteSearchResult, mapRemoteSearchResults } from "../types/types";
import { useEndpoints } from "./useEndpoints";

const useSearchCity = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchResults, setSearchResults] = useState<AppSearchResult[]>([]);
  const { searchEndpoint } = useEndpoints();

  const fetchSearchResults = async () => {
    const response = await fetch(searchEndpoint(searchCity));
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
