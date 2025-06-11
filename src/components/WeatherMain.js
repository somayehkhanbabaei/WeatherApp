import React, { useRef, useState, useEffect } from "react";
import "./WeatherMain.css";

function WeatherMain({ weather, forecast, loading, error }) {
  function formatTime(ts) {
    return new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Get the next 12 forecast slots from now onward
  const now = new Date();
  const hourlySlots =
    forecast && Array.isArray(forecast.list)
      ? forecast.list.filter(
          h => new Date(h.dt * 1000) >= now
        ).slice(0, 12)
      : [];

  // Scroll logic for arrows
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    function checkScroll() {
      const el = listRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
    checkScroll();
    const el = listRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [hourlySlots]);

  function scrollByAmount(amount) {
    if (listRef.current) {
      listRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  }

  return (
    <main className="weather-main">
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "#ff7675" }}>{error}</div>}
      {weather && (
        <>
          <div className="weather-header">
            <div>
              <h2>{weather.city}</h2>
              <p className="weather-chance">
                {weather.weather && weather.weather[0] ? weather.weather[0].description : ""}
              </p>
              <div className="weather-temp">{Math.round(weather.main?.temp ?? weather.temp)}°</div>
            </div>
            <div className="weather-icon">
              {weather.weather && weather.weather[0] && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].main}
                  style={{ width: 80, height: 80 }}
                />
              )}
            </div>
          </div>
          <div className="weather-today" style={{ position: "relative" }}>
            <h4>TODAY'S FORECAST</h4>
            <div style={{ position: "relative" }}>
              {canScrollLeft && (
                <button
                  className="weather-today-scroll-arrow left"
                  onClick={() => scrollByAmount(-200)}
                  aria-label="Scroll left"
                >
                  &#8592;
                </button>
              )}
              <div className="weather-today-list" ref={listRef}>
                {hourlySlots.length > 0 ? (
                  hourlySlots.map((h, i) => (
                    <div className="forecast-item" key={i}>
                      <div>
                        {formatTime(h.dt)}
                      </div>
                      {h.weather && h.weather[0] && (
                        <img
                          src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
                          alt={h.weather[0].main}
                          style={{ width: 32, height: 32 }}
                        />
                      )}
                      <div>{Math.round(h.main?.temp ?? h.temp)}°</div>
                    </div>
                  ))
                ) : (
                  <div>No forecast data available.</div>
                )}
              </div>
              {canScrollRight && (
                <button
                  className="weather-today-scroll-arrow right"
                  onClick={() => scrollByAmount(200)}
                  aria-label="Scroll right"
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>
          <div className="weather-conditions">
            <div>
              <div className="cond-label">Real Feel</div>
              <div className="cond-value">{weather.main?.feels_like ? Math.round(weather.main.feels_like) : "-" }°</div>
            </div>
            <div>
              <div className="cond-label">Wind</div>
              <div className="cond-value">{weather.wind?.speed ?? "-"} m/s</div>
            </div>
            <div>
              <div className="cond-label">Humidity</div>
              <div className="cond-value">{weather.main?.humidity ?? "-"}%</div>
            </div>
            <div>
              <div className="cond-label">Pressure</div>
              <div className="cond-value">{weather.main?.pressure ?? "-"} hPa</div>
            </div>
            <div>
              <div className="cond-label">Visibility</div>
              <div className="cond-value">
                {weather.visibility ? (weather.visibility / 1000).toFixed(1) : "-"} km
              </div>
            </div>
            <div>
              <div className="cond-label">Sunrise</div>
              <div className="cond-value">{weather.sys?.sunrise ? formatTime(weather.sys.sunrise) : "-"}</div>
            </div>
            <div>
              <div className="cond-label">Sunset</div>
              <div className="cond-value">{weather.sys?.sunset ? formatTime(weather.sys.sunset) : "-"}</div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default WeatherMain;
