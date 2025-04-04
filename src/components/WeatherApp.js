import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import { API_KEY, BASE_URL } from '../config';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Load saved city from localStorage on initial render
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    if (savedCity) {
      handleSearch(savedCity);
    }
  }, []);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setLastSearchedCity(city);
      
      // Save the searched city to localStorage
      localStorage.setItem('lastSearchedCity', city);
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || 'City not found');
      }

      const weatherData = await weatherResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const forecastData = await forecastResponse.json();
      
      // Transform the current weather data
      const transformedWeatherData = {
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        windDirection: getWindDirection(weatherData.wind.deg),
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        pressure: weatherData.main.pressure,
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
        clouds: weatherData.clouds.all,
        visibility: weatherData.visibility / 1000, // Convert meters to kilometers
        uvi: weatherData.uvi || 'N/A',
        dewPoint: calculateDewPoint(weatherData.main.temp, weatherData.main.humidity),
        lastUpdated: new Date().toLocaleTimeString(),
      };

      // Transform the forecast data
      const transformedForecastData = processForecastData(forecastData);

      setWeatherData(transformedWeatherData);
      setForecastData(transformedForecastData);
    } catch (err) {
      console.error('Weather API error:', err);
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert wind degrees to direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Helper function to calculate dew point
  const calculateDewPoint = (temp, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint);
  };

  // Helper function to process forecast data
  const processForecastData = (data) => {
    // Group forecast by day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString();
      
      if (!dailyForecasts[day]) {
        dailyForecasts[day] = {
          date: day,
          temps: [],
          icons: [],
          descriptions: [],
          humidity: [],
          windSpeed: [],
          pressure: []
        };
      }
      
      dailyForecasts[day].temps.push(Math.round(item.main.temp));
      dailyForecasts[day].icons.push(item.weather[0].icon);
      dailyForecasts[day].descriptions.push(item.weather[0].description);
      dailyForecasts[day].humidity.push(item.main.humidity);
      dailyForecasts[day].windSpeed.push(Math.round(item.wind.speed * 3.6));
      dailyForecasts[day].pressure.push(item.main.pressure);
    });
    
    // Calculate daily averages
    const processedForecast = Object.values(dailyForecasts).map(day => {
      const avgTemp = Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length);
      const maxTemp = Math.max(...day.temps);
      const minTemp = Math.min(...day.temps);
      
      // Get the most common weather icon and description
      const iconCounts = {};
      const descCounts = {};
      
      day.icons.forEach(icon => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
      });
      
      day.descriptions.forEach(desc => {
        descCounts[desc] = (descCounts[desc] || 0) + 1;
      });
      
      const mostCommonIcon = Object.entries(iconCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      const mostCommonDesc = Object.entries(descCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      return {
        date: day.date,
        avgTemp,
        maxTemp,
        minTemp,
        icon: mostCommonIcon,
        description: mostCommonDesc,
        avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        avgWindSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length),
        avgPressure: Math.round(day.pressure.reduce((a, b) => a + b, 0) / day.pressure.length)
      };
    });
    
    return processedForecast;
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} initialValue={lastSearchedCity} />
      {error && <div className="error">{error}</div>}
      <WeatherDisplay 
        weatherData={weatherData} 
        forecastData={forecastData} 
        loading={loading}
      />
    </div>
  );
};

export default WeatherApp; 