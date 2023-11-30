function getForecast(city) {
  let apiKey = "010at9ca97fd6359640c0357507fb1co";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  let index = 1;
  response.data.daily.forEach(function (day, index) {
    if ((index > 0) & (index < 6)) {
      forecastHtml =
        forecastHtml +
        `

        <div id="forecast-weather">
            <text class="weather-forecast-date">${formatDate(
              day.time
            )}</text> <br /><br />
            <strong class="weather-forecast-day">${formatDay(day.time)}</strong>
            <br />
            <em class="weather-forecast-condition">${
              day.condition.description
            }</em>
            <br />
            <strong class="weather-forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}°C</strong>
            <text class="weather-forecast-temperature-min">${Math.round(
              day.temperature.minimum
            )}°C</text>
          </div>
     `;
    }
  });

  let forecastElement = document.querySelector("#forecast-container");
  forecastElement.innerHTML = forecastHtml;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let month = months[date.getMonth()];
  let noDate = date.getDate();

  return `${month} ${noDate}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getDay()];
}

function refreshWeather(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature-value"
  );
  let currentTemperature = response.data.temperature.current;
  let currentTemperatureUnitElement = document.querySelector(
    "#current-temperature-unit"
  );
  currentTemperatureUnitElement.innerHTML = "°C";

  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = response.data.city.toUpperCase();
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);

  let currentHumidityElement = document.querySelector("#current-humidity");
  currentHumidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  let currentWindElement = document.querySelector("#current-wind");
  currentWindElement.innerHTML = `, Wind: ${response.data.wind.speed} m/s`;

  let currentConditionElement = document.querySelector("#current-condition");
  currentConditionElement.innerHTML = response.data.condition.description;

  let currentDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let month = months[date.getMonth()];
  let noDate = date.getDate();
  let fullYear = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  currentDateElement.innerHTML = `${month} ${noDate} ${fullYear}`;
  let currentDayTimeElement = document.querySelector("#current-day-time");
  currentDayTimeElement.innerHTML = `${day} ${hour}:${minute}`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "010at9ca97fd6359640c0357507fb1co";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  searchCity(searchCityInput.value);
}

let searchCityFormElement = document.querySelector("#search-city-form");
searchCityFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Jersey City");
displayForecast();
