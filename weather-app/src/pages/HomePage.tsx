import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import {
  AppSearchResult,
  RemoteSearchResult,
  FavoriteCity,
  mapRemoteSearchResults,
  mapAppSearchResultToFavoriteCity,
  RemoteWeather,
  mapRemoteWeather,
  Weather,
} from "../types/types";
import SearchResultCard from "../components/SearchResultCard";
import FavoriteCityCard from "../components/FavoriteCityCard";
import { useSearchCity } from "../hooks/useSearchCity";

// const getSearchEndpoint = (city: string): string => {
//   return `https://api.openweathermap.org/geo/1.0/direct?q='${city}'&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
// };

const getWeatherEndpoint = (lat: number, lon: number): string => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
};

const HomePage = () => {
  const [showNoSearchResultsMessage, setShowNoSearchResultsMessage] = useState<boolean>(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);
  const { fetchSearchResults, setSearchCity, searchResults } = useSearchCity();

  useEffect(() => {
    setShowNoSearchResultsMessage(searchResults.length === 0 && !showWelcomeMessage);
  }, [searchResults, showWelcomeMessage]);

  const fetchWeather = async (city: FavoriteCity): Promise<Weather> => {
    const response = await fetch(getWeatherEndpoint(city.lat, city.long));
    const remoteWeather: RemoteWeather = await response.json();
    return mapRemoteWeather(remoteWeather);
  };

  const addFavoriteCity = (searchResult: AppSearchResult) => {
    const isDupe = favoriteCities.some(
      (city) => city.lat === searchResult.lat && city.long === searchResult.long,
    );

    if (isDupe) {
      return;
    }

    const favoriteCity = mapAppSearchResultToFavoriteCity(searchResult);

    fetchWeather(favoriteCity).then((weather) => {
      favoriteCity.weather = weather;
      setFavoriteCities((prevFaves) => [...prevFaves, favoriteCity]);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    fetchSearchResults();
    setShowWelcomeMessage(false);
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
            <SearchResultCard
              key={index}
              searchResult={r}
              onItemClick={addFavoriteCity}
            ></SearchResultCard>
          ))}
        </ul>
      )}
      <div className="flex pt-4">
        {favoriteCities.length > 0 && (
          <ul>
            {favoriteCities.map((city, index) => (
              <FavoriteCityCard key={index} city={city}></FavoriteCityCard>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
