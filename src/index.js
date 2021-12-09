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
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].icon);
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

let currentDate = new Date();
let date = document.querySelector("#date");
date.innerHTML = returnDate(currentDate);

let currentTime = new Date();
let time = document.querySelector("#time");
time.innerHTML = returnTime(currentTime);

findCity("York");

let input = document.querySelector("#city-search");
input.addEventListener("submit", searchSubmit);

let current = document.querySelector("#current");
current.addEventListener("click", getLocation);
