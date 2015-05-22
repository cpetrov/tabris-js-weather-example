(function() {
  var dateFormat = require("dateformat");
  var utility = require("./utility.js");

  exports.create = function() {
    var page = tabris.create("Page", {
      title: "10 day Forecast",
      background: "#f2f2f2",
      topLevel: false
    });
    page.setInput = function(responseData) {
      page.find("#forecastCollectionView").set("items", responseData.list);
      return page;
    };
    createContent(page);
    page.apply(styles);
    return page;
  };

  function createContent(page) {
    tabris.create("CollectionView", {
      id: "forecastCollectionView",
      initializeCell: function(cell) {
        cell.on("change:item", function(widget, item) {
          cell.find("#weekday").set("text", dateFormat(new Date(item.dt * 1000), "ddd").toUpperCase());
          cell.find("#day").set("text", dateFormat(new Date(item.dt * 1000), "dS mmm"));
          cell.find("#icon").set("image", {src: utility.getIconSrc(item.weather[0].icon)});
          cell.find("#temperature").set("text", utility.processTemperature(item.temp.min) + "/" +
            utility.processTemperature(item.temp.max));
          cell.find("#forecast").set("text", "Forecast: " + item.weather[0].description);
          cell.find("#humidity").set("text", "Humidity: " + item.humidity + "%");
        });
        var container = tabris.create("Composite", {id: "container"}).appendTo(cell);
        createDate().appendTo(container);
        tabris.create("ImageView", {id: "icon"}).appendTo(container);
        createTemperature().appendTo(container);
        tabris.create("Composite", {id: "separator"}).appendTo(cell);
        cell.apply(cellStyles);
      }
    }).appendTo(page);

    var cellStyles = {
      "#container": {
        layoutData: {left: 20, top: 10, right: 20, bottom: 10}
      },
      "#icon": {
        scaleMode: "fit",
        layoutData: {centerY: 0, left: ["#dateContainer", 10], width: 75, height: 75}
      },
      "#separator": {
        background: "#e0e0e0",
        layoutData: {left: 0, bottom: 0, right: 0, height: 1}
      },
      "#temperatureContainer": {
        layoutData: {left: ["#icon", 10], centerY: 0}
      },
      "#temperature": {
        layoutData: {left: 0, top: 0},
        font: "18px"
      },
      "#forecast": {
        textColor: "#9a9a9a",
        layoutData: {left: 0, top: ["#temperature", 0]}
      },
      "#humidity": {
        textColor: "#9a9a9a",
        layoutData: {left: 0, top: ["#forecast", 0]}
      },
      "#dateContainer": {
        layoutData: {centerY: 0, left: 0, width: 64}
      },
      "#weekday": {
        alignment: "center",
        layoutData: {top: 0, left: 0, right: 0},
        font: "18px"
      },
      "#day": {
        alignment: "center",
        layoutData: {top: ["#weekday", 0], left: 0, right: 0},
        textColor: "#9a9a9a"
      }
    };
  }

  function createDate() {
    var dateContainer = tabris.create("Composite", {id: "dateContainer"});
    tabris.create("TextView", {id: "weekday"}).appendTo(dateContainer);
    tabris.create("TextView", {id: "day"}).appendTo(dateContainer);
    return dateContainer;
  }

  function createTemperature() {
    var temperatureContainer = tabris.create("Composite", {id: "temperatureContainer"});
    tabris.create("TextView", {id: "temperature"}).appendTo(temperatureContainer);
    tabris.create("TextView", {id: "forecast"}).appendTo(temperatureContainer);
    tabris.create("TextView", {id: "humidity"}).appendTo(temperatureContainer);
    return temperatureContainer;
  }

  var styles = {
    "#forecastCollectionView": {
      layoutData: {left: 0, top: 0, right: 0, bottom: 0},
      itemHeight: 96
    }
  };

})();
