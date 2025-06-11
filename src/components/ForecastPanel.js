import React from "react";
import "./ForecastPanel.css";

// Helper to group forecast by day and get min/max temps
function getDailyFromHourly(list) {
  if (!Array.isArray(list)) return [];
  const days = {};
  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().slice(0, 10);
    if (!days[dayKey]) {
      days[dayKey] = {
        dt: item.dt,
        temps: [],
        icons: [],
        weather: [],
      };
    }
    days[dayKey].temps.push(item.main?.temp ?? item.temp);
    days[dayKey].icons.push(item.weather?.[0]?.icon);
    days[dayKey].weather.push(item.weather?.[0]?.main);
  });
  return Object.entries(days).slice(0, 5).map(([key, val], i) => ({
    dt: val.dt,
    icon: val.icons[0],
    main: val.weather[0],
    temp: {
      max: Math.max(...val.temps),
      min: Math.min(...val.temps),
    },
    dayIndex: i,
  }));
}

function ForecastPanel({ forecast }) {
  const daily = forecast && Array.isArray(forecast.list) ? getDailyFromHourly(forecast.list) : [];
  return (
    <section className="forecast-panel">
      <h4>5-DAY FORECAST</h4>
      <div className="forecast-list">
        {daily.map((d, i) => (
          <div className="forecast-row" key={i}>
            <div className="forecast-day">
              {i === 0
                ? "Today"
                : new Date(d.dt * 1000).toLocaleDateString(undefined, {
                    weekday: "short",
                  })}
            </div>
            {d.icon && (
              <img
                className="forecast-icon"
                src={`https://openweathermap.org/img/wn/${d.icon}.png`}
                alt={d.main}
                style={{ width: 32, height: 32 }}
              />
            )}
            <div className="forecast-desc">{d.main}</div>
            <div className="forecast-temp">
              {`${Math.round(d.temp.max)}° / ${Math.round(d.temp.min)}°`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ForecastPanel;
