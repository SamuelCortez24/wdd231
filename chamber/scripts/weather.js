// scripts/weather.js

const API_KEY = "0a2d0375a53451150f2405a9026a1ad4";
const LAT = -34.9011;
const LON = -56.1645;

// Fetch current weather
async function fetchCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  return res.json();
}

// Fetch 5-day forecast
async function fetchForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast API error");
  return res.json();
}

async function renderWeather() {
  const cur = document.getElementById("weather-current");
  const fore = document.getElementById("weather-forecast");

  try {
    // 🌡️ Current weather
    const current = await fetchCurrentWeather();
    cur.innerHTML = `
      <p><strong>Current:</strong> ${Math.round(current.main.temp)}°C — ${current.weather[0].description}</p>
      <p><strong>Feels like:</strong> ${Math.round(current.main.feels_like)}°C</p>
    `;

    // 📅 Forecast (next 3 days at 12:00)
    const forecast = await fetchForecast();
    fore.innerHTML = "";
    const daily = forecast.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

    daily.forEach(d => {
      const dt = new Date(d.dt * 1000);
      const dayName = dt.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      });

      const el = document.createElement("div");
      el.className = "forecast-day";
      el.innerHTML = `
        <strong>${dayName}</strong>
        <p>${Math.round(d.main.temp)}°C</p>
        <p>${d.weather[0].description}</p>
      `;
      fore.appendChild(el);
    });

  } catch (err) {
    console.error("Weather error:", err);
    cur.innerHTML = "<p style='color:#900'>Unable to load weather data.</p>";
  }
}

document.addEventListener("DOMContentLoaded", renderWeather);
