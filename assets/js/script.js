var searchInputEl = document.querySelector('#search-input');
var searchFormEl = document.querySelector('#search-form');
var currentForecastEl = document.querySelector('.current');
var dashboardEl = document.querySelector('#dashboard');

var handleSearchFormSubmit = function (event) {
  event.preventDefault();

  var searchInput = searchInputEl.value.trim();
  console.log(searchInput);

  if (!searchInput) {
    console.error('Please enter the name of a city');
    return;
  } else {
    fetchWeather(searchInput);
  }
}

var apiKey = '9994ccfc4f65c898d36101a0b3ccac63';

var fetchWeather = function (location) {

  var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' 
  + location +
  '&units=imperial&appid='
  + apiKey;
  
  fetch(weatherApiUrl)
    .then( function(response) {
      return response.json();
    })
    .then( function(data) {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      displayWeather(data);
      console.log('lat', lat);
      console.log('long', lon);
      getForecast(lat, lon);
    })
    .catch( function(error) {
      alert('Unable to connect to OpenWeather');
    });
}

function displayWeather(weather) {
  dashboardEl.classList.remove("hidden");

  currentForecastEl.children[0].textContent = weather.name + " " + dayjs().format('DD/MM/YYYY');
  document.getElementById('current-temp').textContent = "Temp: " + weather.main.temp + "\xB0F";
  document.getElementById('current-wind').textContent = "Wind: " + weather.wind.speed + " MPH";
  document.getElementById('current-humidity').textContent = "Humidity: " + weather.main.humidity + "%";
}

var getForecast = function (latitude, longitude) {
  var forecastApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' 
  + latitude 
  + '&lon=' 
  + longitude
  + '&units=imperial&cnt=40&appid='
  + apiKey;

  fetch(forecastApiUrl)
    .then( function (response) {
      return response.json();
    })
    .then( function(data) {
      generateForecast(data);
    })
    .catch( function (error) {
      alert('Unable to connect to OpenWeather');
    });
}



function generateForecast(forecast) {
  for (var i = 0; i < 6; i++) {
    var forecastCardEl = document.createElement('div');
    var forecastEl = document.querySelector('.forecast');
    if (i!==0) {
      var corrector = 7;
    } else {
      var corrector = 0;
    }
    var trueIndex = i + corrector*i;
    console.log(trueIndex);
    forecastCardEl.classList = 'card flex-row align-center card-rounded p-3';
    forecastCardEl.innerHTML = 'Date: ' + forecast.list[trueIndex].dt_txt + '<br>';
    forecastCardEl.innerHTML += "Temp: " + forecast.list[trueIndex].main.temp + '\xB0F<br>';
    forecastCardEl.innerHTML += "Wind: " + forecast.list[trueIndex].wind.speed + 'MPH<br>';
    forecastCardEl.innerHTML += "Humidity: " + forecast.list[trueIndex].main.humidity + '%<br>';
    forecastEl.appendChild(forecastCardEl);
  }
}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);
