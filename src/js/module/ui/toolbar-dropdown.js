"use strict";
module.exports = function () {
  var $toolbar = $('.js-toolbar');
  if (!$toolbar.length ) return;

  var $btnToggle = $toolbar.find('.js-toolbar-toggle');

  $toolbar.find('.dropdown').each(function () {
    var $dropdownMenu = $(this).find('.dropdown-menu');

    var offsetLeft = $(this).offset().left;
    var offsetRight = ($(window).width() - ($(this).offset().left + $(this).outerWidth()));
    if (offsetLeft < $dropdownMenu.width() ) {
      $dropdownMenu.removeClass('dropdown-menu--left').addClass('dropdown-menu--right');
    } else if (offsetRight < $dropdownMenu.width() ){
      $dropdownMenu.removeClass('dropdown-menu--right').addClass('dropdown-menu--left');
    }
  });

  $btnToggle.on('click', function () {
    $toolbar.toggleClass('toolbar--open');
  });

};
