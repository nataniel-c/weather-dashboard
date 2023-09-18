var searchInputEl = document.querySelector('#search-input');
var searchFormEl = document.querySelector('#search-form');


var handleSearchFormSubmit = function (event) {
  event.preventDefault();

  var searchInput = searchInputEl.value.trim();

  if (!searchInput) {
    console.error('Please enter the name of a city');
    return;
  } else {
    getCoordinates(searchInput);
  }
}

var getCoordinates = function (location) {

  var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
  + location +
  + '&appid=&appid=36e56fdbc7dc57b349ba31ffef417a61';
  
  fetch(geoApiUrl)
    .then(function (response) {
      getForecast(response.lat, response.lon);
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
  
}

var getForecast = function (latitude, longitude) {
  var weatherApiUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' 
  + latitude 
  + '&' + 'lon=' 
  + longitude
  + '&units=standard&cnt=5&appid=36e56fdbc7dc57b349ba31ffef417a61';

  fetch(weatherApiUrl)
    .then(function (response) {
      loadForecast(response);
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

function loadForecast(forecast) {
  // for the 5 cards that should be in the 5 day forecast
  // Make a card that has the day

  for (var i = 0; i < 6; i++) {
    var issueEl = document.createElement('a');
    issueEl.classList = 'list-item flex-row justify-space-between align-center';
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute('target', '_blank');

    var titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;
    issueEl.appendChild(titleEl);

    var typeEl = document.createElement('span');

    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }

    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);
