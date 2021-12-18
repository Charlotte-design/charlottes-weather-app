function returnDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
    currentDate = `${currentDate}st`;
  } else {
    if (currentDate === 2 || currentDate === 22) {
      currentDate = `${currentDate}nd`;
    } else {
      if (currentDate === 3 || currentDate === 23) {
        currentDate = `${currentDate}rd`;
      } else {
        currentDate = `${currentDate}th`;
      }
    }
  }
  let formattedDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;

  return formattedDate;
}

function returnTime(time) {
  let currentHours = time.getHours();
  let currentMinutes = time.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedTime = `${currentHours}:${currentMinutes}`;

  return formattedTime;
}

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekday = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[weekday];
}

function displayForecast(response) {
  let forecastGrid = document.querySelector("#five-day-forecast");
  let forecast = response.data.daily; 
  let fiveDayForecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if(index < 6 && index > 0) {
    fiveDayForecastHTML =
      fiveDayForecastHTML +
      `
    <div class="col-12 forecast">
              <span class="forecast-day">${formatWeekday(day.dt)}</span>
          </br>
          <span class="forecast-max" id="forecast-max">${Math.round(day.temp.max)}</span>&#176;/<span class="forecast-min" id="forecast-min">${Math.round(day.temp.min)}<span>&#176;</span></span>
        </br>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Clear" width="60px" class="forecast-icon" id="forecast-icon"/>
          </br>
          <span class="forecast-description">${day.weather[0].description}</span>
          </div>
          `;
    }

    cForecastTempMax = (day.temp.max);
    cForecastTempMin = (day.temp.min);
  });

  fiveDayForecastHTML = fiveDayForecastHTML + `</div>`;
  forecastGrid.innerHTML = fiveDayForecastHTML;
}

function getCoords(coordinates) {
  let apiKey = "2851d65c3b3f1b70b16c7dcfea44e109";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function displayWeather(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let descrip = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;

  cTemp = (response.data.main.temp);
  cTempMax = (response.data.main.temp_max);
  cTempMin = (response.data.main.temp_min);
  cTempFeelsLike = (response.data.main.feels_like);

  let cityDisplay = document.querySelector("#this-city");
  cityDisplay.innerHTML = cityName;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = descrip;
  let temperatureDisplay = document.querySelector("#temp-now");
  temperatureDisplay.innerHTML = temp;
  let maxDisplay = document.querySelector("#maximum");
  maxDisplay.innerHTML = max;
  let minDisplay = document.querySelector("#minimum");
  minDisplay.innerHTML = min;
  let feelsLikeDisplay = document.querySelector("#feels-like");
  feelsLikeDisplay.innerHTML = feelsLike;
  let humidDisplay = document.querySelector("#humid");
  humidDisplay.innerHTML = humidity;
  let windDisplay = document.querySelector("#wind-spd");
  windDisplay.innerHTML = windSpeed;
  let iconDisplay = document.querySelector("#icon");
  iconDisplay.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].icon);

  getCoords(response.data.coord);
}

function findCity(city) {
  let apiKey = "2851d65c3b3f1b70b16c7dcfea44e109";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  findCity(cityInput.value);
}

function logPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2851d65c3b3f1b70b16c7dcfea44e109";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logPosition);
}

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusConverter.classList.remove("active");
  fahrenheitConverter.classList.add("active");
  let temperature = document.querySelector("#temp-now");
  let fTemperature = (cTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fTemperature);
  let maximum = document.querySelector("#maximum");
  let fTemperatureMax = (cTempMax * 9) / 5 + 32;
  maximum.innerHTML = Math.round(fTemperatureMax);
  let minimum = document.querySelector("#minimum");
  let fTemperatureMin = (cTempMin * 9) / 5 + 32;
  minimum.innerHTML = Math.round(fTemperatureMin);
  let feelsLike = document.querySelector("#feels-like");
  let fTemperatureFeelsLike = (cTempFeelsLike * 9) / 5 + 32;
  feelsLike.innerHTML = Math.round(fTemperatureFeelsLike);
  let maxForecast = document.querySelector("span.forecast-max");
  let fMaxForecast = (cForecastTempMax * 9) / 5 + 32;
  maxForecast.innerHTML = Math.round(fMaxForecast);
  let minForecast = document.querySelector("span.forecast-min");
  let fMinForecast = (cForecastTempMin * 9) / 5 + 32;
  minForecast.innerHTML = Math.round(fMinForecast);
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitConverter.classList.remove("active");
  celsiusConverter.classList.add("active");
  let temperature = document.querySelector("#temp-now");
  let cTemperature = cTemp;
  temperature.innerHTML = Math.round(cTemperature);
  let maximum = document.querySelector("#maximum");
  let cTemperatureMax = cTempMax;
  maximum.innerHTML = Math.round(cTemperatureMax);
  let minimum = document.querySelector("#minimum");
  let cTemperatureMin = cTempMin;
  minimum.innerHTML = Math.round(cTemperatureMin);
  let feelsLike = document.querySelector("#feels-like");
  let cTemperatureFeelsLike = cTempFeelsLike;
  feelsLike.innerHTML = Math.round(cTemperatureFeelsLike);
  let maxForecast = document.querySelector("span.forecast-max");
  let cMaxForecast = cForecastTempMax;
  maxForecast.innerHTML = Math.round(cMaxForecast);
  let minForecast = document.querySelector("span.forecast-min");
  let cMinForecast = cForecastTempMin;
  minForecast.innerHTML = Math.round(cMinForecast);
}

let cTemp = null;
let cTempMax = null;
let cTempMin = null;
let cTempFeelsLike = null;
let cForecastTempMax = null;
let cForecastTempMin = null;

let currentDate = new Date();
let date = document.querySelector("#date");
date.innerHTML = returnDate(currentDate);

let currentTime = new Date();
let time = document.querySelector("#time");
time.innerHTML = returnTime(currentTime);

let input = document.querySelector("#city-search");
input.addEventListener("submit", searchSubmit);

let current = document.querySelector("#current");
current.addEventListener("click", getLocation);

let fahrenheitConverter = document.querySelector("#fahrenheit");
fahrenheitConverter.addEventListener("click", displayFahrenheit);

let celsiusConverter = document.querySelector("#celsius");
celsiusConverter.addEventListener("click", displayCelsius);

findCity("York, UK");