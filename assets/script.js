// Add the JSON ready thing
//Add the day.js into the top div to pull through the date

// Event listener for search button
$("#search-button").on("click", function () {
  // Store API

  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=c6e073c97cdefe7c2943541b6a576268";

  fetch(queryURL).then(function (response) {
    // calling response.json() to extract json data from the response object
    return response.json();
  });
  console.log(queryURL);

  //.then(function (data) {
  // Saving the XXXX property
  //var XXXXX = XXXXXX;

  // Create and store tag
  //var XXXX = $("<XXX>");

  // Set src attribute

  //XXXX.attr("src", XXXX);

  // Prepend to the div
  //$("#XXX").prepend(XXXX);
  //});
  //});

  // Add a for loop
  // Append to certain divs
});
