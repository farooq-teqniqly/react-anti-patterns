export type RemoteSearchResult = {
  name: string;
  country: string;
  state?: string | undefined;
};

export type AppSearchResult = {
  city: string;
  country: string;
  state?: string | undefined;
};

export const mapRemoteSearchResults = (results: RemoteSearchResult[]): AppSearchResult[] => {
  return results.map((r) => {
    return {
      city: r.name,
      country: r.country,
      state: r.state,
    };
  });
};

export type Weather = {
  temp: number;
};

export type FavoriteCity = {
  name: string;
  country: string;
  state?: string | undefined;
  weather?: Weather;
};

export const mapAppSearchResultToFavoriteCity = (results: AppSearchResult): FavoriteCity => {
  return {
    name: results.city,
    country: results.country,
    state: results.state,
  };
};
