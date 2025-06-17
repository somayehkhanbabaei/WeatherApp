import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import WeatherMain from "./WeatherMain";
import ForecastPanel from "./ForecastPanel";
import "./WeatherApp.css";

const CURRENT_API_KEY = "bd888a149767be3f48211f3e513c82a9";

function WeatherApp() {
  const [city, setCity] = useState("Tehran");
  const [query, setQuery] = useState("Tehran");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");
      try {
        // Get coordinates for city
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${CURRENT_API_KEY}`
        );
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("City not found");
        const { lat, lon, name } = geoData[0];

        // Get current weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${CURRENT_API_KEY}`
        );
        const weatherData = await weatherRes.json();
        setWeather({ ...weatherData, city: name });

        // Get 5-day/3-hour forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${CURRENT_API_KEY}`
        );
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      } catch (e) {
        setWeather(null);
        setForecast(null);
        setError(e.message || "Failed to fetch weather data.");
      }
      setLoading(false);
    }
    if (city.trim() !== "") {
      fetchWeather();
    } else {
      setWeather(null);
      setForecast(null);
      setError("Please enter a city name.");
    }
  }, [city]);

  function handleSearch(e) {
    e.preventDefault();
    setError("");
    setCity(query.trim());
  }

  return (
    <div className="app-container">
      <Sidebar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        loading={loading}
      />
      <WeatherMain
        weather={weather}
        forecast={forecast}
        loading={loading}
        error={error}
      />
      <ForecastPanel forecast={forecast} />
    </div>
  );
}

export default WeatherApp;