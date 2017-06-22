module.exports =  function (casper, phantomcss, domainUrl) {
  console.log('should start tests')


  var viewPorts = [
    ['web', 2000, 1366],
    ['ipad', 1024, 1366],
    ['mob', 375, 667]
  ];
  var viewPort = 0;



  return function tests () {
    console.log('teststeststests')
    var media = viewPorts[viewPort][0];
    var page = '';
    casper.viewport(viewPorts[viewPort][1], viewPorts[viewPort][2]);
    // phantomcss.turnOffAnimations();
    console.log(viewPorts[viewPort][1], viewPorts[viewPort][2]);


    function titleBuilder(title) {
      // console.log(page1)
      return title + '___' + media + '___' + page.replace(/\//g, '') ;
    }

    function testHeaderFooter(headerSelector) {
      casper.then(function () {
        phantomcss.screenshot(headerSelector, 5000, '.wpb_revslider_element', titleBuilder('HEADER ' + headerSelector));
      });

      casper.then(function () {
        phantomcss.screenshot('.footer', undefined, '.wpb_revslider_element', titleBuilder('footer ' + headerSelector));
      });
    }

    casper.thenOpen(domainUrl);

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(2)', undefined, '.wpb_revslider_element, .countdown--circles', titleBuilder('NEXT UPCOMING EVENT '));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(3)', undefined, '.wpb_revslider_element', titleBuilder('ABOUT OUR CHURCH '));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(4)', undefined, '.wpb_revslider_element', titleBuilder('LATEST SERMONS '));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(5)', undefined, '.wpb_revslider_element', titleBuilder('UPCOMING EVENTS '));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(6)', undefined, '.wpb_revslider_element', titleBuilder('LATEST FROM OUR BLOG '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(8)', undefined, '.wpb_revslider_element', titleBuilder('SHOP'));
    });

    casper.then(function () {
      phantomcss.screenshot('.widget--subscribe', undefined, '.wpb_revslider_element', titleBuilder('Subscribe'));
    });


    casper.then(function () {
      page = '/home-variation-2/';

      var link = domainUrl + page;
      casper.thenOpen( link );
    });


    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(2)', 5000, '.wpb_revslider_element, .countdown--circles', titleBuilder('NEXT UPCOMING EVENT VAR2 '));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(3)', undefined, '.wpb_revslider_element', titleBuilder('ABOUT OUR CHURCH  VAR2'));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(4)', undefined, '.wpb_revslider_element', titleBuilder('LATEST SERMONS  VAR2'));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(5)', undefined, '.wpb_revslider_element', titleBuilder('OUR CAUSES '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(6)', undefined, '.wpb_revslider_element', titleBuilder('UPCOMING EVENTS VAR2'));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(7)', undefined, '.wpb_revslider_element', titleBuilder('OUR GALLERY '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(9)', undefined, '.wpb_revslider_element', titleBuilder('BLOG '));
    });


    casper.then(function () {
      phantomcss.screenshot('.widget--subscribe', undefined, '.wpb_revslider_element', titleBuilder('Subscribe '));
    });


    casper.then(function () {
      page = '/home-variation-3/';

      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.header.header--v1', 5000, '.wpb_revslider_element', titleBuilder('HEADER '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(2)', 5000, '.wpb_revslider_element', titleBuilder('About'));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(3)', undefined, '.wpb_revslider_element', titleBuilder('NEXT UPCOMING EVENT'));
    });
    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(4)', undefined, '.wpb_revslider_element', titleBuilder('LATEST SERMONS '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(5)', undefined, '.wpb_revslider_element', titleBuilder('UPCOMING EVENTS '));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(6)', undefined, '.wpb_revslider_element', titleBuilder('OUR MINISTRY'));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(7)', undefined, '.wpb_revslider_element', titleBuilder('SHOP'));
    });

    casper.then(function () {
      phantomcss.screenshot('.container-fluid > :nth-child(8)', undefined, '.wpb_revslider_element', titleBuilder('BLOG '));
    });


    casper.then(function () {
      phantomcss.screenshot('.widget--subscribe', undefined, '.wpb_revslider_element', titleBuilder('Subscribe '));
    });



    casper.then(function () {
      page = '/?opt_header_mode=v2';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v2');

    casper.then(function () {
      phantomcss.screenshot('.topbar.topbar--v2', undefined, '.wpb_revslider_element', titleBuilder('Topbar '));
    });

    casper.then(function () {

      page = '/?opt_header_mode=v3';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v3');

    casper.then(function () {
      page = '/?opt_header_mode=v4';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v4');

    casper.then(function () {
      page = '/?opt_header_mode=v5';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v5');
    casper.then(function () {
      phantomcss.screenshot('.topbar.topbar--v5', undefined, '.wpb_revslider_element', titleBuilder('Topbar '));
    });


    casper.then(function () {
      page = '/?opt_header_mode=v6';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v6');
    casper.then(function () {
      phantomcss.screenshot('.topbar.topbar--v6', undefined, '.wpb_revslider_element', titleBuilder('Topbar '));
    });

    casper.then(function () {
      page = '/?opt_header_mode=v7';
    });
    casper.thenOpen( domainUrl + page );

    testHeaderFooter('.header.header--v7');


    casper.then(function () {
      page = '/donations/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/donations/basketball-clinic-for-500-kids-in-nigeria/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/sermons/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });


    casper.then(function () {
      page = '/sermons/follow-me-as-i-follow-christ/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/product-category/events/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/product/holy-eucharist/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/shop/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/product/angel-wall-plaque-hands-praying/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/our-community/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/wbmember/mariusz-ciesla/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/blog/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/dont-miss-out-on-gateways-new-series-jesus-as-pastor-robert-unpacks-and-explains-who-jesus-was-is-and-will-be-2/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    casper.then(function () {
      phantomcss.screenshot('.sidebar', titleBuilder('Sidebar'));
    });

    casper.then(function () {
      page = '/contacts/';
      casper.thenOpen( domainUrl + page );
    });

    testHeaderFooter('.header.header--v1');

    casper.then(function () {
      phantomcss.screenshot('.main__head', titleBuilder('Main head'));
    });

    casper.then(function () {
      phantomcss.screenshot('.main__content', titleBuilder('Main Content'));
    });

    viewPort++;

    if (viewPort < viewPorts.length) {
      casper.then(function () {
        return tests();
      });
    }

    return true;

  };

};