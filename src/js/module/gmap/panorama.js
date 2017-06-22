"use strict";
exports.create = function ($mapContainer, options, $mobilePopupTrigger, onLoad) {
  var mobilePopup = require('../mobile-popup');
  onLoad = onLoad || $.noop;

  if ($mobilePopupTrigger) {
    mobilePopup.wrapContainer($mapContainer, $mobilePopupTrigger, loadPanorama);
  } else {
    loadPanorama();
  }

  function loadPanorama() {
    var map = new google.maps.StreetViewPanorama($mapContainer[0], options);
    onLoad(map);
  }
};
