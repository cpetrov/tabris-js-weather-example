(function() {

  exports.apply = function(page, layout) {
    var generalizedSize = getGeneralizedSize();
    var orientation = getOrientation(page);
    [
      layout[orientation],
      layout[generalizedSize],
      layout[generalizedSize + "-" + orientation]
    ].forEach(function(configuration) {
      if (configuration) {
        page.apply(configuration);
      }
    });
  };

  function getGeneralizedSize() {
    var widestSide = Math.max(screen.width, screen.height);
    if (widestSide > 960) {return "xlarge";}
    if (widestSide > 640) {return "large";}
    if (widestSide > 470) {return "normal";}
    return "small";
  }

  function getOrientation(page) {
    var bounds = page.get("bounds");
    return bounds.width > bounds.height ? "landscape" : "portrait";
  }

})();
