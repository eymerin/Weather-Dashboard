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

let searchHistory = [];
var weatherAPI = 'https://api.openweathermap.org';
var APIKey = 'c4369a41ab8c72d7e6a4b5e1dea8e37a';
var userSearch = document.getElementById('#search');
var searchHistoryContainer = document.querySelector('#history');

//dayjs to create var for current date
var today = dayjs().format('MM/DD/YYYY');
console.log(today);

//populate search history buttons

if (localStorage.getItem('localHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('localHistory'));
};

console.log(searchHistory);

for (let i = 0; i < searchHistory.length; i++) {
    $('#history').append(`<button class="histSearch btn btn-default w-100 mb-2" style="background-color:lightgray">${userSearch}</button>`);
    console.log(searchHistory[searchHistory[i]]);
};

//Set user input var using event listener on search button

$('#searchBtn').on('click', function() {
    // Retrieve the value of the input element
    const userSearch = $('#search').val();
    
    // Do something with the value
    console.log(userSearch);
    fetchCoords(userSearch);
    searchHistory.push(userSearch);
    localStorage.setItem('localHistory', JSON.stringify(searchHistory));
    console.log(localStorage.getItem('localHistory'));
  });

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
    renderWeather();
}

function renderWeather(forecast) {
    var temp = forecast.temp.day;
    var windSpeed = forecast.wind_speed.day;
    var humidity = forecast.humidity.day;
    var city = forecast;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;
}

