export type RemoteSearchResult = {
  name: string;
  country: string;
  state?: string | undefined;
  lat: number;
  lon: number;
};

export type AppSearchResult = {
  city: string;
  country: string;
  state?: string | undefined;
  lat: number;
  long: number;
};

export const mapRemoteSearchResults = (results: RemoteSearchResult[]): AppSearchResult[] => {
  return results.map((r) => {
    return {
      city: r.name,
      country: r.country,
      state: r.state,
      lat: r.lat,
      long: r.lon,
    };
  });
};

export type Weather = {
  temp: number;
};

export type RemoteWeather = {
  main: {
    temp: number;
  };
};

export const mapRemoteWeather = (weather: RemoteWeather): Weather => {
  return {
    temp: weather.main.temp,
  };
};

export type FavoriteCity = {
  name: string;
  country: string;
  state?: string | undefined;
  lat: number;
  long: number;
  weather?: Weather;
};

export const mapAppSearchResultToFavoriteCity = (results: AppSearchResult): FavoriteCity => {
  return {
    name: results.city,
    country: results.country,
    state: results.state,
    lat: results.lat,
    long: results.long,
  };
};
