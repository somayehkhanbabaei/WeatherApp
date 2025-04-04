import React from 'react';
import WeatherIcon from './WeatherIcon';
import './ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  // Format the date to show day of week
  const date = new Date(forecast.date);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  return (
    <div className="forecast-card">
      <div className="forecast-date">{dayOfWeek}</div>
      <WeatherIcon 
        icon={forecast.icon} 
        description={forecast.description} 
        size="small"
      />
      <div className="forecast-temp">
        <span className="max-temp">{forecast.maxTemp}°</span>
        <span className="min-temp">{forecast.minTemp}°</span>
      </div>
      <div className="forecast-desc">{forecast.description}</div>
      <div className="forecast-details">
        <div className="forecast-detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{forecast.avgHumidity}%</span>
        </div>
        <div className="forecast-detail">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{forecast.avgWindSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard; 