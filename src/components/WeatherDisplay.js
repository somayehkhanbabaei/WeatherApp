import React from 'react';
import WeatherCard from './WeatherCard';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className="weather-display">
        <p>Enter a city name to get weather information</p>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <WeatherCard weatherData={weatherData} />
    </div>
  );
};

export default WeatherDisplay; 