// Add the JSON ready thing
$(document).ready(function () {
  //Add the day.js into the top div to pull through the date

  var chosenCity = $("#search-input");
  var todayWeather = $("#today");
  var searchForm = $("#search-form");
  var fiveDayForecast = $("#forecast");

  var searchedCities = [];

  // Display the current day's date
  //function displayDate() {
  //var todayDate = moment().format("DD/MM/YYYY");
  //displayDateHeader.text(todayDate);
  //}
  //displayDate();

  // Event listener for search button

  $("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = chosenCity.val();

    // Store API
    var getCityDetails = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=c6e073c97cdefe7c2943541b6a576268`;
    //event.preventDefault
    //.val()
    //.trim()

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

            // Today's date and weather dashboard
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
      
              <h2>${city + " " + element.dt_txt}</h2>
              <ul>
              <li><img src = ${iconURL}></li>
              <li>Temperature: ${element.main.temp}°C</li>
                  <li>Wind: ${element.wind.speed} mph</li>
                  <li>Humidity: ${element.main.humidity}%</li></ul>
                </section>`;
              todayWeather.append(dashboard);
            }

            // 5 day forecast cards
            for (let index = 8; index < forecastData.list.length; index += 7) {
              const element = forecastData.list[index];
              console.log(element);
              var iconCode = element.weather[0].icon;
              var iconURL =
                "https://openweathermap.org/img/w/" + iconCode + ".png";
              var card = `<ul class="col-2 day">
              <li>Date: ${element.dt_txt}</li>
              <li><img src = ${iconURL}></li>
              <li>Temperature: ${element.main.temp}°C</li>
              <li>Wind: ${element.wind.speed} mph</li>
              <li>Humidity: ${element.main.humidity}%</li>
            </ul>`;
              fiveDayForecast.append(card);
            }
            // Reformat date format

            // var cityButton = $("#search-button");
            // var cityTitle = $("<btn search-button>").text(data.city);

            // cityButton.append(city);
            // $(".list-group").append(cityTitle);
          });
      });
  });
});
