"use strict";
/***************************************************************
 * Helper for displaying the interactive map and interaction
 * with form field in my_listings_add_edit.html
 ==============================================================*/
module.exports = function (options) {
  var _ = require('lodash'),
    geolocation = require('./geolocation'),
    $mapContainer = $('#autocomplete-map');
  _.mergeDefaults = require('./../helper/merge-defaults');

  options = _.mergeDefaults(options, {
    map: {
      zoom: 10,

      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false
    },
    autocomplete: {
      componentRestrictions: {'country': 'us'}
    }
  });


  var map, marker,
    geocoder,
    autocompleteAddress = document.getElementById("autocomplete"),
    autocompleteLat = document.getElementById("autocomplete-lat"),
    autocompleteLng = document.getElementById("autocomplete-lng"),
    $triggerButton = $('.js-map-btn'),
    stateMapInit = false
    ;

  geocoder = new google.maps.Geocoder();


  var gridSize = require('../grid-size');
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var $body = $('body');

  if (gridSize.get() == 'xs') {
    $mapContainer.css({
      width: winWidth,
      height: winHeight
    });

    $triggerButton.colorbox({
      html: $mapContainer,
      onLoad: function () {
        var winWidth = $(window).width();
        var winHeight = window.innerHeight;
        $mapContainer.css({
          width: winWidth,
          height: winHeight
        });
      },
      onComplete: function () {
        if (!stateMapInit) {
          map = new google.maps.Map($mapContainer[0], options.map);
          stateMapInit = true;
        }
        mapInit(map);
        $body.css({overflow: 'hidden'});
      },
      onCleanup: function () {
        $body.css({overflow: 'auto'});
      }
    });
  } else {
    map = new google.maps.Map($mapContainer[0], options.map);
    mapInit(map);
  }

  function mapInit(map) {
    google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);
    });

    geolocation.activate(map, {
      buttonTrigger: '.js-geolocate',
      onSuccess: function (latLng) {
        placeMarker(latLng);
      }
    });

    function placeMarker(location) {
      if (marker) {
        marker.setPosition(location); //on change sa position
      } else {
        addMapMarker(location.lat(), location.lng())
      }
      setCoordinatesFiled(location.lat(), location.lng());
      getAddress(location);
    }

    function getAddress(latLng) {
      geocoder.geocode({'latLng': latLng},
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              autocompleteAddress.value = results[0].formatted_address;
            }
            else {
              autocompleteAddress.value = "No results";
            }
          }
          else {
            autocompleteAddress.value = status;
          }
        });
    }

    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    var autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */( autocompleteAddress ),
      options.autocomplete);

    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

    $('#autocomplete').on('keypress', function (e) {
      if (e.keyCode == 13) return false;
    });


    // When the user selects a city, get the place details for the city and
    // zoom the map in on the city.
    function onPlaceChanged() {
      var place = autocomplete.getPlace();
      if (place.geometry) {
        map.panTo(place.geometry.location);
        // change zoom map only if user did not change it before
        map.setZoom(15);
        if (marker) {
          var markerCoords = new google.maps.LatLng(place.geometry.location.A, place.geometry.location.F);
          marker.setPosition(markerCoords); //on change sa position
        } else {
          addMapMarker(place.geometry.location.A, place.geometry.location.F)
        }
        setCoordinatesFiled(place.geometry.location.A, place.geometry.location.F);
      } else {
        autocomplete.placeholder = 'Enter a address';
      }

    }

    // create marker on map
    function addMapMarker(lat, lng) {
      var markerCoords = new google.maps.LatLng(lat, lng);
      var markerBuilder = require('./marker');

      marker = markerBuilder.createAdvanced({
        position: markerCoords,
        map: map,
        draggable: true
      });

      google.maps.event.addListener(marker, 'dragend', function () {
        placeMarker(marker.getPosition());
      });
    }

    // set coordinates in fileds
    function setCoordinatesFiled(lat, lng) {
      autocompleteLat.value = lat;
      autocompleteLng.value = lng;
    }

    $('.js-autocomplete-coords').on('input', function (e) {
      if ($.isNumeric(autocompleteLat.value) && $.isNumeric(autocompleteLng.value)) {
        var latlng = new google.maps.LatLng(autocompleteLat.value, autocompleteLng.value);
        if (marker) {
          marker.setPosition(latlng); //on change sa position
        } else {
          addMapMarker(latlng.lat(), latlng.lng())
        }
        map.panTo(latlng);
        getAddress(latlng);
        if (e.keyCode == 13) return false;
      }
    });

  }


};
