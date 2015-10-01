(function() {
  var openWeatherService = require("./openWeatherService.js");
  var todayPage = require("./todayPage.js");

  exports.create = function() {
    var page = tabris.create("Page", {
      title: "Search",
      topLevel: true
    });
    createContent(page);
    page.apply(styles);
    return page;
  };

  function createContent(page) {
    var showCity = function() {
      var input = page.children("#cityInput");
      page.children("#messageTextView").set("text", "Gathering current weather data");
      openWeatherService.getWeatherForCity(input.get("text"))
        .then(function(responseData) {
          todayPage.create().setInput(responseData).open();
          page.children("#messageTextView").set("text", "");
        })
        .catch(function(error) {
          page.children("#messageTextView").set("text", error);
        });
    };
    tabris.create("ImageView", {id: "backgroundImage"}).appendTo(page);
    tabris.create("TextView", {id: "title"}).appendTo(page);
    tabris.create("TextInput", {id: "cityInput"}).appendTo(page).on("accept", showCity);
    tabris.create("Button", {id: "searchButton"}).appendTo(page).on("select", showCity);
    tabris.create("TextView", {id: "messageTextView"}).appendTo(page).on("select", showCity);
  }

  console.log("relative ./ notation: " + tabris.app.getResourceLocation("./images/start_page_background.jpg"));
  console.log("relative omitted root notation: " + tabris.app.getResourceLocation("images/start_page_background.jpg"));
  console.log("relative / root notation: " + tabris.app.getResourceLocation("/images/start_page_background.jpg"));

  var styles = {
    "#backgroundImage": {
      layoutData: {left: 0, top: 0, right: 0, bottom: 0},
      scaleMode: "fill",
      image: {src: tabris.app.getResourceLocation("./images/start_page_background.jpg")}
    },
    "#title": {
      markupEnabled: true,
      text: "Get your Weather dose!",
      font: "28px",
      textColor: "white",
      alignment: "center",
      layoutData: {left: 15, right: 15, top: 128}
    },
    "#cityInput": {
      textColor: "white",
      alignment: "center",
      font: "26px",
      text: "Karlsruhe",
      background: tabris.device.get("platform") === "iOS" ? "transparent" : "white",
      layoutData: {left: 68, top: ["#title", 28], right: 68}
    },
    "#searchButton": {
      layoutData: {left: 68, top: ["#cityInput", 10], right: 68, height: 52},
      background: "#fecf59",
      font: "18px",
      textColor: "#5a5a5a",
      text: "Get Weather"
    },
    "#messageTextView": {
      alignment: "center",
      font: "18px",
      layoutData: {left: 10, top: ["#searchButton", 5], right: 10}
    }
  };

})();
