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

function displaySearchWeather(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let descrip = response.data.weather[0].description;

  let citySearch = document.querySelector("#this-city");
  citySearch.innerHTML = cityName;
  let descriptionSearch = document.querySelector("#description");
  descriptionSearch.innerHTML = descrip;
  let temperatureSearch = document.querySelector("#temp-now");
  temperatureSearch.innerHTML = temp;
  let maxSearch = document.querySelector("#maximum");
  maxSearch.innerHTML = max;
  let minSearch = document.querySelector("#minimum");
  minSearch.innerHTML = min;
  let feelsLikeSearch = document.querySelector("#feels-like");
  feelsLikeSearch.innerHTML = feelsLike;
  let humidSearch = document.querySelector("#humid");
  humidSearch.innerHTML = humidity;
  let windSearch = document.querySelector("#wind-spd");
  windSearch.innerHTML = windSpeed;
}

function searchLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "2851d65c3b3f1b70b16c7dcfea44e109";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displaySearchWeather);
}

function displayCurrentWeather(response) {
  let cityName1 = response.data.name;
  let temp1 = Math.round(response.data.main.temp);
  let max1 = Math.round(response.data.main.temp_max);
  let min1 = Math.round(response.data.main.temp_min);
  let feelsLike1 = Math.round(response.data.main.feels_like);
  let humidity1 = Math.round(response.data.main.humidity);
  let windSpeed1 = Math.round(response.data.wind.speed);
  let descrip1 = response.data.weather[0].description;

  let cityHere = document.querySelector("#this-city");
  cityHere.innerHTML = cityName1;
  let description = document.querySelector("#description");
  description.innerHTML = descrip1;
  let temperatureHere = document.querySelector("#temp-now");
  temperatureHere.innerHTML = temp1;
  let maxHere = document.querySelector("#maximum");
  maxHere.innerHTML = max1;
  let minHere = document.querySelector("#minimum");
  minHere.innerHTML = min1;
  let feelsLikeHere = document.querySelector("#feels-like");
  feelsLikeHere.innerHTML = feelsLike1;
  let humidHere = document.querySelector("#humid");
  humidHere.innerHTML = humidity1;
  let windHere = document.querySelector("#wind-spd");
  windHere.innerHTML = windSpeed1;
}

function logPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2851d65c3b3f1b70b16c7dcfea44e109";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logPosition);
}

let currentDate = new Date();
let date = document.querySelector("#date");
date.innerHTML = returnDate(currentDate);

let currentTime = new Date();
let time = document.querySelector("#time");
time.innerHTML = returnTime(currentTime);

let input = document.querySelector("#city-search");
input.addEventListener("submit", searchLocation);

let current = document.querySelector("#current");
current.addEventListener("click", getLocation);
