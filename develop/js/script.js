// weather dashboard with form inputs

// search for a city, presented with current and future conditions for that city
// and that city is added to the search history

// view current weather conditions for that city, presented with the city name, 
// the date, an icon representation of weather conditions, the temperature, the
// humidity, and the the wind speed

// view future weather conditions for that city, presented with a 5-day forecast
// that displays the date, an icon representation of weather conditions, the
// temperature, the wind speed, and the humidity

// click on a city in the search history, presented with current and future 
// conditions for that city

var history = [];
var weatherAPI = 'https://api.openweathermap.org';
var APIKey = 'c4369a41ab8c72d7e6a4b5e1dea8e37a';

var searchForm = document.querySelector('#search-form');
var userSearch = document.querySelector('search');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');
const searchBtn = document.getElementById("searchBtn");



//dayjs to create var for current date
var today = dayjs().format('MM/DD/YYYY');
console.log(today);

//Set user input var using event listener on search button

searchBtn.addEventListener("click", function() {
    userSearch.value = ""
    if (!userSearch.value) {
        return;
    }
    var search = userSearch.value.trim();
    fetchCoords(search)
});

//call api using user input
//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.

function fetchCoords(userSearch) {
    var apiUrl = `${weatherAPI}/geo/1.0/direct?q=${userSearch}&limit=5&appid=${APIKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data[0]) {
          alert('Location not found');
        } else {
          //appendToHistory(search);
          fetchWeather(data[0]);
          console.log(data[0])
        }
      })
      .catch(function (err) {
        console.error(err);
      });
}
  
function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${weatherAPI}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(city, data);
      })
      .catch(function (err) {
        console.error(err);
      });
}

fetchCoords();
fetchWeather();
//renderCurrentWeather();































////if (localStorage.getItem('searchHistory')) {
    history = JSON.parse(localStorage.getItem('history'));
//};

//console.log(searchHistory);

//for (let i = 0; i < searchHistory.length; i++) {
//    $('#history').append('<button type="button" class="btn btn-primary"></button>');
//    console.log(searchHistory[searchHistory[i]]);
//};