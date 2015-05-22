/*globals Promise:true, fetch:false*/

(function() {
  Promise = require("promise");
  require("whatwg-fetch");

  var weatherServiceUrl = "http://api.openweathermap.org/data/2.5/weather";
  var forecastServiceUrl = "http://api.openweathermap.org/data/2.5/forecast";

  var rejectPromise = function(response) {
    var hasResponseMessage = response.message && Object.keys(response).length !== 0;
    return Promise.reject(hasResponseMessage ? response.message : "Bad response.");
  };

  exports.getWeatherForCity = function(cityName) {
    return fetch(weatherServiceUrl + "?q=" + cityName)
      .then(function(response) {
        if (response.status !== 200) {
          return Promise.reject(response.statusText);
        }
        return response;
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (!response.name) {
          return rejectPromise(response);
        }
        return response;
      });
  };

  exports.get10DayForecastForCity = function(cityName) {
    return fetch(forecastServiceUrl + "/daily?cnt=10&q=" + cityName)
      .then(function(response) {
        if (response.status !== 200) {
          return Promise.reject(response.statusText);
        }
        return response;
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (!response.city.name) {
          return rejectPromise(response);
        }
        return response;
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });
  };

})();
