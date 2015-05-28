(function() {
  var openWeatherService = require("./openWeatherService.js");
  var todayPage = require("./todayPage.js");
  var layoutPicker = require("./layoutPicker.js");

  exports.create = function() {
    var page = tabris.create("Page", {title: "Search", topLevel: true})
      .on("resize", function() {
        layoutPicker.apply(page, layout);
      });
    createContent(page);
    page.apply(configuration);
    return page;
  };

  function createContent(page) {
    var showCity = function() {
      var input = page.find("#cityInput");
      page.find("#messageTextView").set("text", "Gathering current weather data");
      openWeatherService.getWeatherForCity(input.get("text"))
        .then(function(responseData) {
          todayPage.create().setInput(responseData).open();
          page.find("#messageTextView").set("text", "");
        })
        .catch(function(error) {
          page.find("#messageTextView").set("text", error);
        });
    };
    tabris.create("ImageView", {id: "backgroundImage"}).appendTo(page);
    var inputContainer = tabris.create("Composite", {id: "inputContainer"}).appendTo(page);
    tabris.create("TextView", {id: "title"}).appendTo(page);
    tabris.create("TextInput", {id: "cityInput"}).appendTo(inputContainer).on("accept", showCity);
    tabris.create("Button", {id: "searchButton"}).appendTo(inputContainer).on("select", showCity);
    tabris.create("TextView", {id: "messageTextView"}).appendTo(inputContainer).on("select", showCity);
  }

  var configuration = {
    "#backgroundImage": {
      scaleMode: "fill",
      image: {src: "./images/start_page_background.jpg"}
    },
    "#title": {
      markupEnabled: true,
      text: "<b>Get your weather dose!</b>",
      textColor: "black",
      alignment: "center"
    },
    "#cityInput": {
      textColor: "white",
      alignment: "center",
      text: "Karlsruhe",
      background: tabris.device.get("platform") === "iOS" ? "transparent" : "white"
    },
    "#searchButton": {
      background: "#fecf59",
      textColor: "#414141",
      text: "Get Weather"
    },
    "#messageTextView": {
      alignment: "center",
      textColor: "white"
    }
  };

  var layout = {
    "landscape": {
      "#inputContainer": {layoutData: {left: 0, right: 0, centerY: 0}}
    },
    "normal": {
      "#cityInput": {font: "22px"},
      "#title": {font: "24px"},
      "#searchButton": {font: "18px"},
      "#messageTextView": {font: "18px"}
    },
    "large": {
      "#cityInput": {font: "32px"},
      "#title": {font: "34px"},
      "#searchButton": {font: "20px"},
      "#messageTextView": {font: "20px"}
    },
    "xlarge": {
      "#cityInput": {font: "34px"},
      "#title": {font: "36px"},
      "#searchButton": {font: "22px"},
      "#messageTextView": {font: "22px"}
    },
    "normal-portrait": {
      "#inputContainer": {layoutData: {left: 0, right: 0, centerY: 0}}, // TODO: centerY offset has no effect on Android
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 128}},
      "#cityInput": {layoutData: {centerX: 0, top: 0, width: 256}},
      "#searchButton": {layoutData: {centerX: 0, top: ["#cityInput", 14], width: 256, height: 48}},
      "#messageTextView": {layoutData: {centerX: 0, top: ["#searchButton", 5], width: 256}}
    },
    "normal-landscape": {
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 32}},
      "#cityInput": {layoutData: {top: 0, centerX: 0, width: 384}},
      "#searchButton": {layoutData: {top: ["#cityInput", 10], centerX: 0, width: 384, height: 52}},
      "#messageTextView": {layoutData: {top: ["#searchButton", 5], centerX: 0, width: 384}}
    },
    "large-portrait": {
      "#inputContainer": {layoutData: {left: 0, right: 0, centerY: 0}}, // TODO: centerY offset has no effect on Android
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 200}},
      "#cityInput": {layoutData: {centerX: 0, top: 0, width: 384}},
      "#searchButton": {layoutData: {centerX: 0, top: ["#cityInput", 14], width: 384, height: 64}},
      "#messageTextView": {layoutData: {centerX: 0, top: ["#searchButton", 5], width: 384}}
    },
    "large-landscape": {
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 48}},
      "#cityInput": {layoutData: {top: 0, centerX: 0, width: 416}},
      "#searchButton": {layoutData: {top: ["#cityInput", 10], centerX: 0, width: 416, height: 52}},
      "#messageTextView": {layoutData: {top: ["#searchButton", 5], centerX: 0, width: 416}}
    },
    "xlarge-portrait": {
      "#inputContainer": {layoutData: {left: 0, right: 0, centerY: 28}},
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 256}},
      "#cityInput": {layoutData: {centerX: 0, top: 0, width: 384}},
      "#searchButton": {layoutData: {centerX: 0, top: ["#cityInput", 14], width: 384, height: 64}},
      "#messageTextView": {layoutData: {centerX: 0, top: ["#searchButton", 5], width: 384}}
    },
    "xlarge-landscape": {
      "#backgroundImage": {layoutData: {left: 0, top: 0, right: 0, bottom: 0}},
      "#title": {layoutData: {left: 20, right: 20, top: 128}},
      "#cityInput": {layoutData: {top: 0, centerX: 0, width: 416}},
      "#searchButton": {layoutData: {top: ["#cityInput", 10], centerX: 0, width: 416, height: 52}},
      "#messageTextView": {layoutData: {top: ["#searchButton", 5], centerX: 0, width: 416}}
    }
  };

})();
