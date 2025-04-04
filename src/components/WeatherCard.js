import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weatherData.city}, {weatherData.country}</h2>
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.description}
          className="weather-icon"
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
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{weatherData.windSpeed} km/h</span>
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
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 