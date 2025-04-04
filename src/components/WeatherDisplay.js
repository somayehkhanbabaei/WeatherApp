import React from 'react';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, forecastData }) => {
  if (!weatherData) {
    return (
      <div className="weather-display">
        <div className="empty-state">
          <p>Enter a city name to get weather information</p>
          <div className="empty-state-icon">🌤️</div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <WeatherCard weatherData={weatherData} />
      
      {forecastData && forecastData.length > 0 && (
        <div className="forecast-container">
          <h3>5-Day Forecast</h3>
          <div className="forecast-list">
            {forecastData.map((day, index) => (
              <ForecastCard key={index} forecast={day} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay; 