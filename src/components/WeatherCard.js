import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <h2>{weatherData.city}</h2>
      <div className="weather-info">
        <div className="temperature">
          <span className="temp-value">{weatherData.temperature}°C</span>
        </div>
        <div className="weather-details">
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} km/h</p>
          <p>Description: {weatherData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 