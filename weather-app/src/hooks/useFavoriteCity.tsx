import { useState } from "react";
import {
  FavoriteCity,
  Weather,
  RemoteWeather,
  mapRemoteWeather,
  AppSearchResult,
  mapAppSearchResultToFavoriteCity,
} from "../types/types";

const useFavoriteCity = () => {
  const getWeatherEndpoint = (lat: number, lon: number): string => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  };

  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);

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

  return {
    favoriteCities,
    addFavoriteCity,
  };
};

export { useFavoriteCity };
