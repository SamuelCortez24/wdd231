// chamber/scripts/weather.js
const API_KEY = "0a2d0375a53451150f2405a9026a1ad4"; 
const LAT = -34.9011;
const LON = -56.1645;

// Fetch current weather
async function fetchCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error (current)");
  return res.json();
}

// Fetch 5-day forecast
async function fetchForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error (forecast)");
  return res.json();
}

async function renderWeather() {
  const cur = document.getElementById("weather-current");
  const fore = document.getElementById("weather-forecast");

  try {
    const current = await fetchCurrentWeather();
    cur.innerHTML = `
      <div class="weather-card">
        <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}">
        <p><strong>${Math.round(current.main.temp)}°C</strong></p>
        <p>${current.weather[0].description}</p>
        <p><small>Feels like ${Math.round(current.main.feels_like)}°C</small></p>
      </div>
    `;

    // Forecast: choose entries at 12:00:00 and show next 3
    const forecast = await fetchForecast();
    const midday = forecast.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

    fore.innerHTML = "";
    midday.forEach(d => {
      const dt = new Date(d.dt * 1000);
      const dayName = dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

      const el = document.createElement("div");
      el.className = "forecast-day";
      el.innerHTML = `
        <strong>${dayName}</strong>
        <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png" alt="${d.weather[0].description}">
        <p>${Math.round(d.main.temp)}°C</p>
        <p>${d.weather[0].description}</p>
      `;
      fore.appendChild(el);
    });

  } catch (err) {
    console.error("Weather error:", err);
    if (cur) cur.innerHTML = "<p style='color:#900'>Unable to load weather data. Check console for details.</p>";
    if (fore) fore.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", renderWeather);
