const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        weatherInfo.innerHTML = `
            <h2><i class="fas fa-location-dot"></i> ${data.name}</h2>
            <p><i class="fas fa-temperature-high"></i> Temperature: ${data.main.temp}°C</p>
            <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</p>
            <p><i class="fas fa-droplet"></i> Humidity: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: Could not fetch weather data</p>`;
    }
}
