// Add the JSON ready thing
$(document).ready(function () {
  //Add the day.js into the top div to pull through the date

  var chosenCity = $("#search-input");
  var displayDateHeader = $("#datedisplay");
  var searchForm = $("search-form");
  var fiveDayForecast = $("forecast");
  var city = chosenCity.value;
  var searchedCities = [];

  // Display the current day's date
  function displayDate() {
    var todayDate = moment().format("ddd MM/DD/YYYY");
    displayDateHeader.text(todayDate);
  }
  displayDate();

  // Event listener for search button

  $("#search-button").on("click", function () {
    // Store API
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6e073c97cdefe7c2943541b6a576268`;

    //var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=c6e073c97cdefe7c2943541b6a576268`;

    //event.preventDefault

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var cityButton = $("<button>");
        var cityTitle = $("<button>").text(data.city);

        cityButton.append(city);
        $(".input-group-append").append(cityButton);
      });
  });
});
