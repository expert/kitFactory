/***************************************************************
 * Enables fixed menu
 * Enables fixed search bar in mobile view
 ==============================================================*/
module.exports = function () {
  var debounce = require('lodash/debounce');
  var gridSize = require('../grid-size');
  var $body = $('body'),
    $header = $('.header'),
    $headerNav = $('#header-nav'),
    $headerNavOffset = $('#header-nav-offset'),
    $searchFormButton = $('.js-search-form-btn'),
    $listingFilter = $('.js-listing-filter'),
    setCssClass = '',
    lgOffset = $headerNav.offset().top + 600,
    _cssClass = null;

  $headerNavOffset.height($headerNav.height());

  var setHeaderClass = function () {
    var offsetTop = $(window).scrollTop();
    if (offsetTop > lgOffset) {
      setCssClass = 'header-fixed';
    } else {
      setCssClass = '';
    }

    if (setCssClass !== _cssClass) {
      $header.removeClass('header-fixed').addClass(setCssClass);
      if (gridSize.get() !== 'xs') $headerNav.removeClass('header-fixed').addClass(setCssClass);
      $headerNavOffset.removeClass('header-fixed').addClass(setCssClass);
      if ($searchFormButton.length) {
        $searchFormButton.removeClass('header-fixed').addClass(setCssClass);
        $listingFilter.removeClass('header-fixed').addClass(setCssClass);
      }
      _cssClass = setCssClass;
    }
  };

  $(window).on('scroll', debounce(setHeaderClass, 30));
};