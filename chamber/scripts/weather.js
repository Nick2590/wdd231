// Weather.js - Phoenix Chamber of Commerce
// Fetches current weather + 3-day forecast using OpenWeather API

const tempEl = document.querySelector('#current-temp');
const iconEl = document.querySelector('#weather-icon');
const descEl = document.querySelector('#weather-desc');
const forecastEl = document.querySelector('#forecast');

// Phoenix, AZ coordinates
const lat = 33.4484;
const lon = -112.0740;
const apiKey = "a94731ec57187d9a115b083b5ba60114"; 

// Current Weather URL
const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Forecast URL (5-day / 3-hour forecast)
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch Current Weather
async function getCurrentWeather() {
    try {
        const response = await fetch(currentURL);
        const data = await response.json();

        tempEl.textContent = `${Math.round(data.main.temp)}°F`;
        descEl.textContent = data.weather[0].description;

        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        iconEl.setAttribute('src', iconSrc);
        iconEl.setAttribute('alt', data.weather[0].description);

    } catch (error) {
        console.error('Weather fetch error:', error);
    }
}

// Fetch 3-Day Forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        // Filter forecast to one result per day (24 hours apart)
        const daily = data.list.filter(item => item.dt_txt.includes("18:00:00"));
        const threeDays = daily.slice(0, 3);

        forecastEl.innerHTML = "";

        threeDays.forEach(day => {
            const date = new Date(day.dt_txt);
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;

            forecastEl.innerHTML += `
                <div class="forecast-day">
                    <h4>${date.toLocaleDateString('en-US', { weekday: 'short' })}</h4>
                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="Forecast icon">
                    <p>${temp}°F</p>
                </div>
            `;
        });

    } catch (error) {
        console.error('Forecast fetch error:', error);
    }
}

getCurrentWeather();
getForecast();