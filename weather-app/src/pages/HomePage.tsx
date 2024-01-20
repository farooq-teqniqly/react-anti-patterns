const HomePage = () => {
  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" data-testid="search-input" />
      <ul>
        <li data-testid="search-results"></li>
        <li data-testid="search-results"></li>
        <li data-testid="search-results"></li>
      </ul>
    </div>
  );
};

export default HomePage;
