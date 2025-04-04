import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import { API_KEY, BASE_URL } from '../config';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      
      // Transform the data into our desired format
      const transformedData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        clouds: data.clouds.all,
        visibility: data.visibility / 1000, // Convert meters to kilometers
      };

      setWeatherData(transformedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default WeatherApp; 