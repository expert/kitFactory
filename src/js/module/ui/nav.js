var wpconfig = require('../../wp/module/wpconfig');

exports.init = function () {
    /*------------------------------------------------------------------
     * More info docs_build/ui/nav.html
     ==============================================================*/

    var gridSize = require('../grid-size');
    var $nav = $('.js-nav');
    var $header7 = $('.header--v7');
    var $toolbar = $('.js-toolbar');
    var $body = $('body');
    var $navOnClick = $('.js-nav-onclick');
    var $navLinkDropdown = $('.has-children > a');
    var $navItem = $('.nav__item');
    var $navBtn = $('.js-menu-btn');
    var $onePageLink = $('.js-dapi-scrollto .nav__link');
    var lastId;
    var scrollItems = $onePageLink.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) return item;
        });

    var navBtnChange = function (active) {
        if (active) {
            $navBtn.removeClass('active');
            $nav.removeClass('opened');
            $navBtn.find('.header__menu-svg').html('<use xlink:href="#icon-menu"></use>');
        } else {
            $navBtn.addClass('active');
            $nav.addClass('opened');
            $navBtn.find('.header__menu-svg').html('<use xlink:href="#icon-close"></use>');
        }
    };

    var onePageActive = function () {
        var fromTop = $(this).scrollTop() + 70,
            cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });

        cur = cur[cur.length - 1];
        var selectedId = cur && cur.length ? cur[0].id : "";

        if (lastId !== selectedId) {
            lastId = selectedId;
            $onePageLink
                .parent().removeClass("js-dapi-scrollto__active")
                .end().filter("[href='#" + selectedId + "']").parent().addClass("js-dapi-scrollto__active");
        }
    };

    var scrollToBlock = function (offsetPX) {
        var offsetViewport = $(window).scrollTop(),
            scrolTime;

        if (offsetPX == offsetViewport) {
            return false;
        }
        if (offsetPX > offsetViewport) {
            scrolTime = (offsetPX - offsetViewport) / 4;
        }
        else {
            scrolTime = (offsetViewport - offsetPX) / 4;
        }

        $('html, body').animate({
            scrollTop: offsetPX - 50
        }, scrolTime);

        return scrolTime;
    };

    /**
     *
     * @param header
     * @param checkpoint
     */
    var headerSticky = function (header, checkpoint) {
        var $header = $(header),
            $nav = $header.find('.js-nav'),
            $toolbar = $header.find('.js-toolbar'),
            cssClass = '',
            cssClassNav = '',
            cssClassToolbar = '',
            _stateCssClass = null,
            $checkpoint = $(checkpoint);
        var checkOffset = $checkpoint.offset().top + $checkpoint.height();
        var setHeaderStickyClass = function () {
            var offsetTop = $(window).scrollTop();

            if (offsetTop > checkOffset) {
                cssClass = 'header--sticky';
                cssClassNav = 'nav--dark';
                cssClassToolbar = 'toolbar--dark';
            } else {
                cssClass = '';
                cssClassNav = '';
                cssClassToolbar = '';
            }

            if (cssClass !== _stateCssClass) {
                $header.removeClass('header--sticky');
                $toolbar.removeClass('toolbar--dark');
                if ($nav.hasClass('nav--v7')) $nav.removeClass('nav--dark');
                $header.addClass(cssClass);
                $nav.addClass(cssClassNav);
                $toolbar.addClass(cssClassToolbar);
                _stateCssClass = cssClass;
            }
        };

        $(window).on('scroll', setHeaderStickyClass);
        setHeaderStickyClass();
    };

    $navBtn.on('click', function () {
        navBtnChange($(this).hasClass('active'))
    });

    $navLinkDropdown.on('click', function () {
        var openOnClick = ['xs', 'sm', 'md'].indexOf(gridSize.get()) > -1 || !!$navOnClick.length;

        if (!openOnClick) return;
        var $link = $(this);
        var $item = $link.closest('.nav__item');
        if ($item.hasClass('opened')) {
            $item.removeClass('opened');
            if ($item.hasClass('nav__item--lvl-1')) $body.removeClass('nav--opened');
            if (gridSize.get() !== 'xs' && $nav.hasClass('nav--v7')) {
                if ($header7.hasClass('header--sticky')) {
                    $toolbar.addClass('toolbar--dark');
                    $nav.addClass('nav--dark');
                }
            }
        } else {
            $navItem.removeClass('opened');
            $item.parents('.has-children').addClass('opened');
            $item.addClass('opened');
            if (gridSize.get() === 'lg' && $nav.hasClass('nav--v7')) {
                $body.addClass('nav--opened');
                $nav.removeClass('nav--dark');
                $toolbar.removeClass('toolbar--dark');
            }
        }
        if ($item.hasClass('has-children')) return false;
    });


    $('.has-children').each(function (i, item) {
        var $dropdown = $(item).find('.nav__sub');
        var offsetLeft = $(item).offset().left;
        var offsetRight = ($(window).width() - ($(item).offset().left + $(item).outerWidth()));
        if (offsetLeft < $dropdown.width()) {
            $dropdown.removeClass('nav__sub--left').addClass('nav__sub--right');
        } else if (offsetRight < $dropdown.width()) {
            $dropdown.removeClass('nav__sub--right').addClass('nav__sub--left');
        }
    });

    $(document).on('click', function (event) {
        var isNav = !!$(event.target).closest('.js-nav').length;
        var isNavBtn = $(event.target).hasClass('js-menu-btn') || $(event.target).closest('.js-menu-btn').length !== 0 || $(event.currentTarget.activeElement).hasClass('js-menu-btn');
        if (isNav || isNavBtn) return;

        $nav.find('.nav__item').removeClass('opened');
        if (gridSize.get() !== 'xs' && $nav.hasClass('nav--v7')) {

            $body.removeClass('nav--opened');
            if ($header7.hasClass('header--sticky')) {
                $toolbar.addClass('toolbar--dark');
                $nav.addClass('nav--dark');
            }
        }

        navBtnChange(true);
    });

    if (wpconfig.var.isHeaderSticky && ['v1', 'v2', 'v3', 'v4', 'v7'].indexOf(wpconfig.var.headerVariation) > -1) {

        var $checkpoint = $('.main > .container-fluid').children().first();
        if ($checkpoint.length) {
            headerSticky('.header--' + wpconfig.var.headerVariation, $checkpoint);
        }
    }

    if ( $onePageLink != undefined) {

        $onePageLink.on('click', function(e) {
            e.preventDefault();

            var thisTarget = $(this).attr('href');

            navBtnChange($navBtn.hasClass('active'));
            scrollToBlock($(thisTarget).offset().top);
            var timeOperation = onePageActive();

            setTimeout(function() {
                onePageActive();
            }, timeOperation);
        });

        $(window).scroll(function () {
            onePageActive();
        });
    }


};