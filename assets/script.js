// Add the JSON ready thing
$(document).ready(function () {
  // Add DOM variables
  var chosenCity = $("#search-input");
  var todayWeather = $("#today");
  var fiveDayForecast = $("#forecast");

  // Add function to save to and retrieve from local storage

  (function () {
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    if (!cityHistory) {
      localStorage.setItem("cityHistory", JSON.stringify([]));
    }
  })();

  var saveCity = function (cityName) {
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    displaySearchHistory(cityHistory);
  };

  // Append button list to history element in HTML
  var displaySearchHistory = function (arrOfCities) {
    arrOfCities.forEach(function () {
      console.log(arrOfCities);
    });
  };

  var getWeatherData = function (event) {
    todayWeather.empty();
    event.preventDefault();

    var city = chosenCity.val();
    saveCity(city);

    // Store API
    var getCityDetails = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=c6e073c97cdefe7c2943541b6a576268`;

    //Fetch details from API
    fetch(getCityDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityLat = data.coord.lat;
        var cityLon = data.coord.lon;
        var cityForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=metric&appid=c6e073c97cdefe7c2943541b6a576268`;

        fetch(cityForecast)
          .then(function (resp) {
            return resp.json();
          })
          .then(function (forecastData) {
            console.log(forecastData);

            // Pull through data for today's date and weather dashboard
            for (
              let index = 0;
              index < forecastData.list.length;
              index += 1430
            ) {
              const element = forecastData.list[index];
              console.log(element);

              var iconCode = element.weather[0].icon;
              var iconURL =
                "https://openweathermap.org/img/w/" + iconCode + ".png";

              var dashboard = `<section id="today" class="mt-3" role="region" aria-live="polite">
            <ul>
            <h2>${city + " " + element.dt_txt}</h2>
            <li><img src = ${iconURL}></li>
            <li>Temp: ${element.main.temp}°C</li>
                <li>Wind: ${element.wind.speed} mph</li>
                <li>Humidity: ${element.main.humidity}%</li></ul>
              </section>`;
              todayWeather.append(dashboard);
            }
            fiveDayForecast.empty();

            // Pull through data for 5-day forecast cards

            for (let index = 8; index < forecastData.list.length; index += 7) {
              const element = forecastData.list[index];
              console.log(element);
              var iconCode = element.weather[0].icon;
              var iconURL =
                "https://openweathermap.org/img/w/" + iconCode + ".png";
              var card = `<ul class="col-2 day">
            <li>${element.dt_txt}</li>
            <li><img src = ${iconURL}></li>
            <li>Temp: ${element.main.temp}°C</li>
            <li>Wind: ${element.wind.speed} mph</li>
            <li>Humidity: ${element.main.humidity}%</li>
          </ul>`;
              fiveDayForecast.append(card);
            }

            //Still to do
            // Reformat date format

            // Add previous searches as buttons under the search form

            function createSearchHistory() {
              var addCity = `<div class="list-group" id="history"></div><button>${city}</button>`;
              $("#history").append(addCity);
            }
            createSearchHistory();

            // Make the past searches appear when clicking on the buttons

            // Make the last city display. Can't remember what I did here.
            //function displayLastCity() {
            //$("ul").empty();
            //var storedCity = JSON.parse(localStorage.getItem(cityname));
            //for (i = 0; i < storedCity.length; i++) {
            //createSearchHistory(storedCity[i]);
            //}
            //searchedCities = storedCity[i - 1];
            //fetch(getCityDetails);
            //}
          });
      });
  };

  $("#search-button").on("click", getWeatherData);
});
