exports.getIconSrc = function(icon) {
  return "./images/icons/" + icon + ".png";
};

exports.processTemperature = function(kelvinTemperature) {
  var celsiusTemperature = exports.kelvinToCelsius(kelvinTemperature);
  return exports.formatTemperature(celsiusTemperature);
};

exports.formatTemperature = function(celsiusTemperature) {
  return Math.round(celsiusTemperature * 10) / 10 + "°C";
};

exports.kelvinToCelsius = function(kelvinTemperature) {
  return kelvinTemperature - 273.15;
};
