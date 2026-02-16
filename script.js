const API_KEY = "YOUR_API_KEY_HERE";

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const loading = document.getElementById("loading");
const weatherInfo = document.getElementById("weatherInfo");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weatherIcon");

// Auto detect location on load
window.onload = () => {
  getLocationWeather();
};

// Search city
searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;

  if (city === "") return;

  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
});

// Current location
locationBtn.addEventListener("click", getLocationWeather);

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
    });
  }
}

// Fetch weather
async function fetchWeather(url) {
  loading.classList.remove("hidden");
  weatherInfo.classList.add("hidden");

  const response = await fetch(url);
  const data = await response.json();

  loading.classList.add("hidden");

  if (data.cod !== 200) {
    alert("City not found");
    return;
  }

  updateUI(data);
}

// Update UI
function updateUI(data) {
  weatherInfo.classList.remove("hidden");

  cityName.innerText = data.name;

  temperature.innerText = Math.round(data.main.temp) + "°C";

  condition.innerText = data.weather[0].main;

  humidity.innerText = data.main.humidity + "%";

  wind.innerText = data.wind.speed + " m/s";

  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  changeBackground(data.weather[0].main);
}

// Dynamic background
function changeBackground(weather) {
  const body = document.body;

  if (weather === "Clear")
    body.style.background = "linear-gradient(135deg,#f7971e,#ffd200)";
  else if (weather === "Clouds")
    body.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
  else if (weather === "Rain")
    body.style.background = "linear-gradient(135deg,#314755,#26a0da)";
  else if (weather === "Snow")
    body.style.background = "linear-gradient(135deg,#e6dada,#274046)";
  else body.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)";
}
