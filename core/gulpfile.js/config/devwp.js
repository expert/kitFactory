var d = require('config/defer').deferConfig;
var _ = require('lodash');
var path = require('path');
var webpackPlugins = require('./includes/js').webpack.app.plugins;
var fonts = require('./includes/fonts');
var Visualizer = require('webpack-visualizer-plugin');
delete fonts.copy.php;

webpackPlugins.push(new Visualizer());

module.exports = {
  target: 'wp',
  env: 'dev',
  build: {
    dest: '../web/app/themes/webelieve/assets',
    destAssets: '../web/app/themes/webelieve/assets',
    pubDestAssets: ''
  },
  js: {
    webpack: {
      app: {
        watch: true,
        devtool: 'source-map',
        context: d(function (config) {
          return path.resolve(config.build.srcAssets)
        }),
        entry: {
          app: './js/wp/app.js',
          customizer: './js/wp/customizer.js'
        },
        externals: {
          'jquery': 'jQuery'
        },
        plugins: webpackPlugins
      },
      backendCustomizer: {
        devtool: 'cheap-source-map',
        context: d(function (config) {
          return path.resolve(config.build.srcAssets)
        }),
        entry: {
          backendcustomizer: './js/wp/backend-customizer.js'
        },
        output: {
          pathinfo: true,
          path: d(function (config) {
            return path.resolve(config.build.destAssets);
          }),
          filename: "js/[name].js",
          publicPath: d(function (config) {
            return config.build.pubDestAssets;
          })
        },
        resolve: {
          extensions: ['.js']
        },
        externals: {
          'jquery': 'jQuery',
          'underscore': '_'
        }
      }
      // wpadmin: {
      //   devtool: 'cheap-source-map',
      //   context: d(function (config) {
      //     return path.resolve(config.build.srcAssets)
      //   }),
      //   entry: {
      //     admin: './js/wp/admin.js'
      //   },
      //   output: {
      //     pathinfo: true,
      //     path: d(function (config) {
      //       return config.build.destAssets
      //     }),
      //     filename: "js/[name].js",
      //     publicPath: d(function (config) {
      //       return config.build.pubDestAssets;
      //     })
      //   },
      //   resolve: {
      //     extensions: ['', '.js']
      //   },
      //   externals: {
      //     'jquery': 'jQuery',
      //     'underscore': '_'
      //   }
      // }
    }
    //copy: d(function (config) {
    //  return false;
    //})
  },
  css: {
    entrySassFiles: {
      allThemes: {
        independent: true
      },
      // wpEditor: {
      //   src: d(function (config) {
      //     return config.css.src + '/editor.sass'
      //   }),
      //   recompileOnChange: true
      // },
      wpCustomizer: {
        src: d(function (config) {
          return config.css.src + '/customizer.sass'
        }),
        recompileOnChange: true
      },
      wp: {
        src: d(function (config) {
          return config.css.src + '/wordpress.sass'
        }),
        recompileOnChange: true
      }
    }
  },
  fonts: fonts
};

