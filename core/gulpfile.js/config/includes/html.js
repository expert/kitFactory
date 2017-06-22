var d = require('config/defer').deferConfig;
var path = require('path');
module.exports = {
  src: d(function (config) {
    return config.build.src;
  }),
  watch: d(function (config) {
    return config.html.src + '/modules/**/*.jade';
  }),
  srcGlob: d(function (config) {
    return config.html.src + '/modules/pages/*.jade';
  }),
  dest: d(function (config) {
    return config.build.dest;
  }),
  destGlob: d(function (config) {
    return config.html.dest + '/*.html';
  }),
  inlineCssWatch: d(function (config) {
    return [
      config.css.dest + '/email.css'
    ];
  }),
  jadeSettings: {
    pretty: true,
    locals: {
      _: require('lodash'),
      data: d(function (config) {
        return require(path.resolve(config.html.src + '/modules/demodata.js'))
      }),
      path: {
        css: d(function (config) {
          return config.css.pubDest;
        }),
        img: d(function (config) {
          return config.images.pubDest;
        }),
        media: d(function (config) {
          return config.images.pubDestDemo;
        }),
        js: d(function (config) {
          return config.js.pubDest;
        })
      }
    }
  },
  filterSettings: function (file) {
    return !/[\/|\\]partials/.test(file.path);
  }
};