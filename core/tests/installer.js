
var utils = require("utils");

module.exports =  function (casper, phantomcss, domainUrl) {

  casper.waitForSelectorText = function(selector, text, then, onTimeout, timeout){
    this.waitForSelector(selector, function _then(){
      this.waitFor(function _check(){
        var content = this.fetchText(selector);
        if (utils.isRegExp(text)) {
          return text.test(content);
        }
        return content.indexOf(text) !== -1;
      }, then, onTimeout, timeout);
    }, onTimeout, timeout);
    return this;
  };


  console.log('should start installer')

  console.log('installerinstallerinstallerinstallerinstaller')


  casper.thenOpen(domainUrl + 'wp-admin');

  casper.waitForSelector("form input#user_login", function() {
    this.fillSelectors('form#loginform', {
      'input#user_login' : 'admin',
      'input#user_pass' : 'admin'
    }, true);

    console.log("Logging In...")

    this.click('#wp-submit');
  });

  casper.thenOpen(domainUrl + 'wp-admin/admin.php?page=wizard-webelieve');


  casper.waitForSelector(".envato-setup-actions", function() {
    phantomcss.screenshot('.envato-setup', 'setup step Welcome');
    casper.click('.button-next')
  });

  casper.waitForSelector(".button-next", function() {
    phantomcss.screenshot('.envato-setup', 'setup step Compatibility');
    casper.click('.button-next')
  });

  casper.waitForSelector(".button-next", function() {
    phantomcss.screenshot('.envato-setup', undefined, '.spinner', 'setup step Plugins');
    casper.click('.button-next')
  });

  casper.waitForSelectorText('[data-slug="js_composer"] span', 'Success', function() {
    phantomcss.screenshot('.envato-setup', undefined, '.spinner', 'setup step Plugins DONE!!!');
  }, function () {
    console.log(' cant install plugins')
  }, 600000);


  casper.waitForUrl(/updates$/, function() {
    phantomcss.screenshot('.envato-setup', 'setup step Updates');
    casper.click('a.button.button-large.button-next')
  }, function () {
    console.log(' cant install updates')
  }, 600000);

  casper.waitForUrl(/import$/, function() {
    phantomcss.screenshot('.envato-setup', 'setup step Import');
    casper.click('.button-next')
  }, function () {
    console.log(' cant install plugins')
  }, 600000);


  casper.waitForText("Installing Default Settings.", function() {
    phantomcss.screenshot('.envato-setup', undefined, '.spinner', 'setup step Import DONE!!!');
  }, function () {
    console.log(' cant import demo content')
  }, 600000);


  casper.waitForUrl(/apikey$/, function() {
    phantomcss.screenshot('.envato-setup', undefined, '.spinner', 'setup step API Key');
    casper.click('.button-next')
  }, function () {
    console.log(' cant import demo content')
  }, 60000);

  casper.waitForUrl(/customize$/, function() {
    phantomcss.screenshot('.envato-setup', 'setup step Customize');
    casper.click('.button-next')
  }, function () {
    console.log(' not sure what problem')
  }, 60000);


  casper.waitForSelector(".button-next", function() {
    phantomcss.screenshot('.envato-setup', 'setup step Support');
    casper.click('.button-next')
  });

  casper.waitForSelector(".button-next", function() {
    phantomcss.screenshot('.envato-setup', 'setup step Finish');
    casper.click('.button-next')
  });

  // casper.waitForUrl(domainUrl, function() {
  //   phantomcss.screenshot('body', undefined, '.wpb_revslider_element, .countdown--circles', 'Installation done');
  // });

  // casper.then(function () {
  //   phantomcss.screenshot('#setup', 15000, '.wpb_revslider_element', 'setup ');
  // });
  // casper.then(function () {
  //   casper.click('#language-continue')
  //   // phantomcss.screenshot('#setup', 15000, '.wpb_revslider_element', 'setup ');
  // });

  return true;
};