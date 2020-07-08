const weather = document.querySelector(".js-weather");
const weatherIcons = document.querySelector(".weatherIcons");
const COORDS = "coords";

const API_KEY = "fb87bad35d114696310836ba77e07f32";

function paintWeather(weatherIcon) {
  const weatherImage = new Image();
  weatherImage.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  weatherImage.classList.add("weatherImage");
  weatherIcons.prepend(weatherImage);
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const weatherIcon = json.weather[0].icon;
      weather.innerHTML = `${temperature}℃ & ${place}`;
      paintWeather(weatherIcon);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
