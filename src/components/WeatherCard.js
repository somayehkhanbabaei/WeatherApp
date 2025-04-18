import React from 'react';
import WeatherIcon from './WeatherIcon';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weatherData.city}, {weatherData.country}</h2>
        <WeatherIcon 
          icon={weatherData.icon} 
          description={weatherData.description} 
          size="large"
        />
      </div>
      
      <div className="weather-info">
        <div className="temperature">
          <span className="temp-value">{weatherData.temperature}°C</span>
          <span className="feels-like">Feels like: {weatherData.feelsLike}°C</span>
        </div>
        
        <div className="weather-description">
          {weatherData.description}
        </div>

        <div className="weather-details">
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weatherData.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weatherData.windSpeed} km/h {weatherData.windDirection}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weatherData.pressure} hPa</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{weatherData.visibility} km</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-label">Clouds</span>
              <span className="detail-value">{weatherData.clouds}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Dew Point</span>
              <span className="detail-value">{weatherData.dewPoint}°C</span>
            </div>
          </div>

          <div className="sun-times">
            <div className="sun-time">
              <span className="time-label">Sunrise</span>
              <span className="time-value">{weatherData.sunrise}</span>
            </div>
            <div className="sun-time">
              <span className="time-label">Sunset</span>
              <span className="time-value">{weatherData.sunset}</span>
            </div>
          </div>
          
          <div className="last-updated">
            Last updated: {weatherData.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 