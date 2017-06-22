"use strict";
var merge = require('lodash/merge');
var debounce = require('lodash/debounce');
var defaultsDeep = require('lodash/defaultsDeep');
exports.create = function ($mapContainer, $mobilePopupTrigger, onLoad) {
  var mobilePopup = require('./mobile-popup');
  var gridSize = require('./grid-size');

  onLoad = onLoad || $.noop;

  if ($mobilePopupTrigger) {
    mobilePopup.wrapContainer($mapContainer, $mobilePopupTrigger, loadMap);
  } else {
    loadMap();
  }

  function loadMap() {

    onLoad();
  }

  var initLgMap = debounce(function () {
    if (gridSize.get() !== 'xs') {
      $('.map__wrap').html($($mapContainer[0]).detach().css({
        width: '100%',
        height: 'auto'
      }));

      google.maps.event.trigger($mapContainer[0], 'resize');
    }
  }, 500);

  $(window).resize(initLgMap);
};

exports.init = function (container, location, options) {
  /**
   * See more options
   * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
   */
  var createGmapMarker = require('./gmap/marker');
  var mapOptions = defaultsDeep(options || {}, {
    zoom: 10,
    center: new google.maps.LatLng(location.latitude, location.longitude),
    // Disable scrolling wheel for usability purposes
    scrollwheel: false,
    zoomControl: true,
    mapTypeControl: true,
    autocomplete: {
      componentRestrictions: {'country': 'us'}
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true,
    scaleControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    panControl: true,
    panControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    }
  });
  /**
   * Google map initialization
   ==============================================================*/

  var $container = $(container);
  var $mapCanvas = $container.find('.js-map-canvas');
  if (!$mapCanvas.length) return;

  (function () {
    // We're using here sample coordinates, please replace them with real ones
    var coordinates = new google.maps.LatLng(location.latitude, location.longitude);
    // Default map zoom
    // jQuery object with map container

    var $mapBtn = $container.find('.js-map-btn');


    /**
     * This is a wrapper around original Google Maps object,
     * which brings some user experience improvements for mobile users,
     * So that, when user loads the map on small-screen device, it
     * is replaced by a button, clicking on it will open full screen
     * popup with the map in it.
     *
     * If you don't want/need that, you can call `google.maps.Map` contructor directly
     *
     * See https://developers.google.com/maps/documentation/javascript/
     * for more examples and options
     */
    exports.create(
      // Map container
      $mapCanvas,

      // A button, clicking on which will display the map in a fullscreen popup on small screens
      $mapBtn,

      /**
       * This callback is executed when the Google Map is loaded
       * As first agrument it receives the google map object
       *
       * Please place here all the code that needs the google map object
       */
      function () {
        var map = new google.maps.Map($mapCanvas[0], merge(mapOptions, {coordinates: coordinates}));

        /**
         * app.createMarker is a helper which contains
         * preconfigured Marker object (see docs https://developers.google.com/maps/documentation/javascript/markers)
         *
         * If you want something more sophisticated, please use these libraries directly
         */
        createGmapMarker.create(
          map,
          coordinates,
          location.address
        );
      });
  })();
};
