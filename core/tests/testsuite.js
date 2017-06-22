/*
 Require and initialise PhantomCSS module
 Paths are relative to CasperJs directory
 */

var fs = require('fs');
// console.log(fs.workingDirectory)
// console.log(casper.cli.get('mode'))
var path = fs.absolute(fs.workingDirectory + '/tests/phantomcss.js');
var phantomcss = require(path);
var webpages = require('./webpages');
var installer = require('./installer');
// var screenshots = require('./screenshots');

var mode = casper.cli.get('mode') || 'prod';
var domainUrl = casper.cli.get('domainUrl') || ((mode === 'prod') ? 'https://webelieve.codefactory47.com/' : 'http://webelieve.demo/');

casper.test.begin('Coffee machine visual tests', function (test) {
  var nameIndex = 37;
  phantomcss.init({
    rebase: casper.cli.get("rebase"),
    // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
    casper: casper,
    libraryRoot: fs.absolute(fs.workingDirectory + '/tests/'),
    screenshotRoot: fs.absolute(fs.workingDirectory + '/tests/screenshots/' + mode),
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/tests/failures/' + mode),
    addLabelToFailedImage: false,
    mismatchTolerance: 0.8,
    // fileNameGetter: function(root,filename){
    //   // globally override output filename
    //   // files must exist under root
    //   // and use the .diff convention
    //   var name = root+'/somewhere/'+ (++nameIndex);
    //   if(fs.isFile(name+'.png')){
    //     return name+'.diff.png';
    //   } else {
    //     return name+'.png';
    //   }
    // },

    // hideElements: '.wpb_revslider_element',

    /*
     screenshotRoot: '/screenshots',
     failedComparisonsRoot: '/failures'
     casper: specific_instance_of_casper,
     libraryRoot: '/phantomcss',
     fileNameGetter: function overide_file_naming(){},
     onPass: function passCallback(){},
     onFail: function failCallback(){},
     onTimeout: function timeoutCallback(){},
     onComplete: function completeCallback(){},
     hideElements: '#thing.selector',
     addLabelToFailedImage: true,
     outputSettings: {
     errorColor: {
       red: 255,
       green: 255,
       blue: 0
     },
     errorType: 'movement',
     transparency: 0.3
     }*/
  });


  casper.on('remote.message', function (msg) {
    this.echo(msg);
  });

  casper.on('error', function (err) {
    this.die("PhantomJS has errored: " + err);
  });

  casper.on('resource.error', function (err) {
    casper.log('Resource load error: ' + err, 'warning');
  });

  casper.on('page.initialized', function (page) {
    console.log('page.initialized');
  });

  /*
   The test scenario
   */

  casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11');


  // casper.start( 'https://webelieve.codefactory47.com/', function () {
  casper.start();
  casper.viewport(2000, 1366);

  console.log('mode', mode)
  if (mode === 'build') installer(casper, phantomcss, domainUrl);
  // if (mode === 'screen') screenshots(casper, phantomcss, domainUrl);

  webpages(casper, phantomcss, domainUrl)();

  casper.then(function now_check_the_screenshots() {
    // compare screenshots
    phantomcss.compareAll();
  });

  /*
   Casper runs tests
   */
  casper.run(function () {
    console.log('\nTHE END.');
    // phantomcss.getExitStatus() // pass or fail?
    casper.test.done();
  });
});
