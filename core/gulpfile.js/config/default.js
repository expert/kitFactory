var d = require('config/defer').deferConfig;
var path = require('path');
var minimist = require('minimist');
var knownOptions = {
  bool: [
    'skip-clean',
    'php-server',
    'jade-force',
    'themeforest'
  ],
  default: {
    'skip-clean': false,
    'php-server': false,
    'jade-force': true,
    'themeforest': false
  }
};

var options = minimist(process.argv.slice(2), knownOptions);

module.exports = {
  build: {
    src: "./",
    dest: "./template_build",
    srcAssets: d(function (config) {
      return config.build.src + '/src';
    }),
    destAssets: d(function (config) {
      return config.build.dest + '/assets';
    }),
    pubDestAssets: 'assets/'
  },
  browserSync: require('./includes/browser-sync'),
  js: require('./includes/js'),
  css: require('./includes/css'),
  fonts: require('./includes/fonts'),
  images: require('./includes/images'),
  server: require('./includes/server'),
  html: require('./includes/html'),
  preprocess: require('./includes/preprocess'),
  docs: require('./includes/docs'),
  args: options
};