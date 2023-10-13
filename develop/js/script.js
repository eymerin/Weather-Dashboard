let searchHistory = [];
var weatherAPI = 'https://api.openweathermap.org';
var APIKey = 'c4369a41ab8c72d7e6a4b5e1dea8e37a';
const searchBar = document.getElementById('#search');
var searchHistoryContainer = document.querySelector('#history');
const displayToday = document.getElementById("today")


//dayjs to create var for current date
var today = dayjs().format('MM/DD/YYYY');
console.log(today);

//populate search history buttons

if (localStorage.getItem('localHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('localHistory'));
    console.log(searchHistory[0]);
};

for (let i = 0; i < searchHistory.length; i++) {
    $('#history').append(`<button class="histSearch btn btn-default w-100 mb-2" style="background-color:lightgray">${searchHistory[searchHistory[i]]}</button>`);
    console.log(searchHistory[searchHistory[i]]);
};

//Set user input var using event listener on search button

$('#searchBtn').on('click', function() {
  //localStorage.clear();
  // Retrieve the value of the input element
  const userSearch = $('#search').val();
  console.log(userSearch);
  fetchCoords(userSearch);
  searchHistory.push(userSearch);

  if (!searchHistory.includes(userSearch)) {
    const userSearchString = JSON.stringify(userSearch);
    localStorage.setItem('userSearch', userSearchString);
    
  }
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
          //appendToHistory(userSearch);
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
    const weatherLoc = location;
    var city = location.name;
    var apiUrl = `${weatherAPI}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`;
    console.log(forecast);
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(city, data);
        console.log(data.current.clouds)
        //forecast = data
        renderCurrentWeather(city, data);
        renderForecastCards(data);
      })
}

function renderCurrentWeather(city, data) {
  console.log(data);
  var iconDescription = data.current.weather.description;
  const unixTimestamp = data.current.dt;
  const date = dayjs.unix(unixTimestamp);
  displayToday.textContent=""
  displayToday.innerHTML +=
    `<h2 id="date">${city} ${today}</h2>
    <img id="conditions" attribute="${iconDescription}" src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"></img>
    <h5 id="temp">High ${data.current.temp} F</h5>
    <h5 id="wind">Wind ${data.current.wind_speed} mph</h5>
    <h5 id="humidity">Humidity ${data.current.humidity}</h5>`
}

//render cards
function renderForecastCards(data) {
  forecastContainer.textContent = ""

  for (let index = 0; index < 5; index++) {
    var iconDescription = data.daily[index].weather.description;
    const unixTimestamp = data.daily[index].dt; // example Unix timestamp
    const date = dayjs.unix(unixTimestamp);
    const formattedDate = date.format('MMMM DD YYYY');
    forecastContainer.innerHTML += 
      `<div class="col mx-1 bg-info p-2">
        <h4>${formattedDate}</h4>
        <img id="conditions" attribute="${iconDescription}" src="https://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}@2x.png"></img>
        <h5 id="temphigh">High ${data.daily[index].temp.max} F</h5>
        <h5 id="templow">Low ${data.daily[index].temp.min} F</h5>
        <h5 id="wind">Wind ${data.daily[index].wind_speed} mph</h5>
        <h5 id="humidity">Humidity ${data.daily[index].humidity}</h5>
      </div> `
  }

}

