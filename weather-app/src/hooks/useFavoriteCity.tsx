import { useState } from "react";
import {
  FavoriteCity,
  Weather,
  RemoteWeather,
  mapRemoteWeather,
  AppSearchResult,
  mapAppSearchResultToFavoriteCity,
} from "../types/types";
import { useEndpoints } from "./useEndpoints";

const useFavoriteCity = () => {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);
  const { weatherEndpoint } = useEndpoints();

  const fetchWeather = async (city: FavoriteCity): Promise<Weather> => {
    const response = await fetch(weatherEndpoint(city.lat, city.long));
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
