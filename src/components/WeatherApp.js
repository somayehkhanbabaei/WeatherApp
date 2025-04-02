import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      // We'll implement the API call later
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error">{error}</div>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default WeatherApp; 