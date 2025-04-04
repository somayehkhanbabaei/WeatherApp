import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ icon, description, size = 'medium' }) => {
  // Map OpenWeatherMap icon codes to more descriptive names
  const getIconClass = (iconCode) => {
    if (!iconCode) return 'default';
    
    // Extract the base icon code (e.g., '01d' -> '01')
    const baseCode = iconCode.substring(0, 2);
    
    // Map to our custom classes
    const iconMap = {
      '01': 'clear',
      '02': 'partly-cloudy',
      '03': 'cloudy',
      '04': 'overcast',
      '09': 'shower',
      '10': 'rain',
      '11': 'thunderstorm',
      '13': 'snow',
      '50': 'mist'
    };
    
    return iconMap[baseCode] || 'default';
  };
  
  // Determine size class
  const sizeClass = {
    'small': 'icon-small',
    'medium': 'icon-medium',
    'large': 'icon-large'
  }[size] || 'icon-medium';
  
  const iconClass = getIconClass(icon);
  
  return (
    <div className={`weather-icon-container ${sizeClass}`}>
      <div className={`weather-icon-animated ${iconClass}`}>
        <img 
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon-img"
        />
      </div>
    </div>
  );
};

export default WeatherIcon; 