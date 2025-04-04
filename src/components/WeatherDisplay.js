import React from 'react';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import LoadingSpinner from './LoadingSpinner';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, forecastData, loading }) => {
  if (loading) {
    return <LoadingSpinner message="Fetching weather data..." />;
  }

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
        <div className="forecast-section">
          <div className="forecast-header">
            <h2>5-Day Forecast</h2>
          </div>
          <div className="forecast-scroll-container">
            <div className="forecast-container">
              {forecastData.map((day, index) => (
                <ForecastCard key={index} forecast={day} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay; 