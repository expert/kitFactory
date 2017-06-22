
var utils = require("utils");

module.exports =  function (casper, phantomcss, domainUrl) {


  var index = 0;

  // casper.thenOpen(domainUrl, function () {
  //   phantomcss.screenshot('body', 5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/home-variation-2/#slide3', function () {
  //   phantomcss.screenshot('body', 5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/home-variation-3/#slide3', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v2', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v3', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v4', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v5', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v6', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/?opt_header_mode=v7', function () {
  //   phantomcss.screenshot('body',  5000, '.tt', +index);
  // });
  // casper.thenOpen(domainUrl + '/product-category/events/?view=grid', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/product-category/events/?view=list', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/product-category/events/?view=masonry', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/product/contemplative-wednesdays/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/donations/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/donations/?opt_causes.display_mode=list', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/donations/basketball-clinic-for-500-kids-in-nigeria/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/sermons/?view=grid', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/sermons/?view=list', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/sermons/?view=masonry', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/sermons/abounding-in-the-work-the-believers-ambitions/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/shop/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/product/angel-wall-plaque-hands-praying/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/gallery/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/gallery/exhibition-film/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/our-community/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/wbmember/mariusz-ciesla/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/blog/?view=grid', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/blog/?view=list', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/dont-miss-out-on-gateways-new-series-jesus-as-pastor-robert-unpacks-and-explains-who-jesus-was-is-and-will-be-2/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v2', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v3', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v4', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v5', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v6', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  // casper.thenOpen(domainUrl + '/contacts/?opt_header_mode=v7', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  //
  // casper.thenOpen(domainUrl + '/asdf', function () {
  //   phantomcss.screenshot('body', +index);
  // });
  casper.thenOpen(domainUrl + '/wp/wp-admin/');

  casper.waitForSelector("form input#user_login", function() {
    this.fillSelectors('form#loginform', {
      'input#user_login' : '',
      'input#user_pass' : ''
    }, true);

    console.log("Logging In...")

    this.click('#wp-submit');
  });

  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=167&action=edit&lang=en', function () {
    phantomcss.screenshot('body', ++index);
  });

  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=852&action=edit', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=342&action=edit&lang=en', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/edit.php?post_type=page', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=57&action=edit&lang=en', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=387&action=edit&lang=en', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/admin.php?page=newsletter_main_index', function () {
    phantomcss.screenshot('body', +index);
  });
  casper.thenOpen(domainUrl + '/wp/wp-admin/post.php?post=1259&action=edit', function () {
    phantomcss.screenshot('body', +index);
  });

  casper.thenOpen(domainUrl + '/wp/wp-admin/admin.php?page=wizard-cf47placeholder&step=compatibility', function () {
    phantomcss.screenshot('body', +index);
  });

  casper.thenOpen(domainUrl + '/wp/wp-admin/customize.php?url=https%3A%2F%2Fwebelieve.codefactory47.com%2Fsermons%2F%3Fview%3Dgrid&changeset_uuid=be310851-b0b2-4c9c-b54a-0d392609eb17', function () {
    phantomcss.screenshot('body', +index);
  });


  return true;
};