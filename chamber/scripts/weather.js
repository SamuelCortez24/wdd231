// scripts/weather.js

// 🔑 OpenWeatherMap API key
const API_KEY = "0a2d0375a53451150f2405a9026a1ad4";

// Coordinates of Montevideo, Uruguay
const LAT = -34.9011;
const LON = -56.1645;

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,hourly,alerts&units=metric&lang=en&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather API error");

    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    const cur = document.getElementById("weather-current");
    if (cur)
      cur.innerHTML =
        '<p style="color:#900">Unable to load weather data. Check console for details.</p>';
    console.error("Weather error:", err);
  }
}

function renderWeather(data) {
  const cur = document.getElementById("weather-current");
  const fore = document.getElementById("weather-forecast");

  if (!cur || !fore) return;

// 🌡️ Current weather
  const c = data.current;
  cur.innerHTML = `
    <p><strong>Current:</strong> ${Math.round(c.temp)}°C — ${c.weather[0].description}</p>
    <p><strong>Feels like:</strong> ${Math.round(c.feels_like)}°C</p>
  `;

  // 📅 3-day forecast
  const days = data.daily.slice(1, 4);
  fore.innerHTML = "";
  days.forEach((d) => {
    const dt = new Date(d.dt * 1000);
    const dayName = dt.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const el = document.createElement("div");
    el.className = "forecast-day";
    el.innerHTML = `
      <strong>${dayName}</strong>
      <p>${Math.round(d.temp.day)}°C</p>
      <p>${d.weather[0].description}</p>
    `;
    fore.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", fetchWeather);
