(function() {
  var dateFormat = require("dateformat");
  var openWeatherService = require("./openWeatherService.js");
  var forecastPage = require("./forecastPage.js");
  var utility = require("./utility.js");

  exports.create = function() {
    var page = tabris.create("Page", {
      title: "Weather",
      background: "#f2f2f2",
      topLevel: false
    }).on("disappear", function() {
      tabris.ui.find("#forecastAction").dispose();
    }).on("appear", function() {
      tabris.create("Action", {
        id: "forecastAction",
        title: "Forecast",
        placementPriority: "high"
      }).on("select", function() {
        var cityName = page.find("#cityName").get("text");
        openWeatherService.get10DayForecastForCity(cityName)
          .then(function(responseData) {
            forecastPage.create().setInput(responseData).open();
          });
      });
    });
    page.setInput = function(responseData) {
      page.find("#cityName").set("text", responseData.name);
      page.find("#date").set("text", dateFormat(new Date(), "ddd, mmmm dS"));
      page.find("#icon").set("image", {src: utility.getIconSrc(responseData.weather[0].icon)});
      page.find("#minTemp").set("text", "Min: " +
        utility.processTemperature(responseData.main.temp_min));
      page.find("#maxTemp").set("text", "Max: " +
        utility.processTemperature(responseData.main.temp_max));
      page.find("#humidity").set("text", "Humidity: " + responseData.main.humidity + "%");
      page.find("#temperature").set("text", "<b>" +
        utility.processTemperature(responseData.main.temp) + "</b>");
      page.find("#description").set("text", responseData.weather[0].description);
      return page;
    };
    createContent(page);
    page.apply(styles);
    return page;
  };

  function createContent(page) {
    var container = tabris.create("Composite", {id: "container"}).appendTo(page);
    tabris.create("TextView", {id: "cityName"}).appendTo(container);
    tabris.create("TextView", {id: "date"}).appendTo(container);
    var iconDetailsContainer = tabris.create("Composite", {id: "iconDetailsContainer"})
      .appendTo(container);
    tabris.create("ImageView", {id: "icon"}).appendTo(iconDetailsContainer);
    createInfoContainer().appendTo(iconDetailsContainer);
    tabris.create("TextView", {id: "temperature"}).appendTo(container);
    tabris.create("TextView", {id: "description"}).appendTo(container);
  }

  function createInfoContainer() {
    var infoContainer = tabris.create("Composite", {id: "infoContainer"});
    tabris.create("TextView", {id: "maxTemp"}).appendTo(infoContainer);
    tabris.create("TextView", {id: "minTemp"}).appendTo(infoContainer);
    tabris.create("TextView", {id: "humidity"}).appendTo(infoContainer);
    return infoContainer;
  }

  var styles = {
    "#container": {
      layoutData: {left: 15, top: 15, right: 15, bottom: 15}
    },
    "#cityName": {
      font: "25px",
      layoutData: {left: 0, top: 0}
    },
    "#date": {
      font: "14px",
      textColor: "#afafaf",
      layoutData: {left: 0, top: ["#cityName", 0]}
    },
    "#iconDetailsContainer": {
      layoutData: {left: 0, top: ["#date", 10], right: 0}
    },
    "#iconContainer": {
      layoutData: {left: 0, top: 0}
    },
    "#icon": {
      layoutData: {left: 15, centerY: 0, width: 150, height: 150}
    },
    "#temperature": {
      markupEnabled: true,
      font: "60px",
      layoutData: {left: 0, top: ["#iconDetailsContainer", 0]}
    },
    "#description": {
      font: "20px",
      textColor: "#3332fc",
      layoutData: {left: 0, top: ["#temperature", 0]}
    },
    "#infoContainer": {
      background: "#cccccc",
      layoutData: {left: ["#icon", 15], height: 150, top: 0, right: 0}
    },
    "#maxTemp": {
      layoutData: {left: 15, top: 15}
    },
    "#minTemp": {
      layoutData: {left: 15, top: ["#maxTemp", 10]}
    },
    "#humidity": {
      layoutData: {left: 15, top: ["#minTemp", 10]}
    }
  };

})();
