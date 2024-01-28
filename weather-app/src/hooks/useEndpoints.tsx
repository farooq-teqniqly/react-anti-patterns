const useEndpoints = () => {
  const weatherEndpoint = (lat: number, lon: number): string => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  };

  const searchEndpoint = (city: string): string => {
    return `https://api.openweathermap.org/geo/1.0/direct?q='${city}'&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
  };

  return {
    weatherEndpoint,
    searchEndpoint,
  };
};

export { useEndpoints };
