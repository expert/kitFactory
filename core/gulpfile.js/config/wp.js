var config = require('./devwp');
var webpack = require('webpack');
var webpackPlugins = require('./includes/js').webpack.app.plugins;
var fonts = require('./includes/fonts');
var minimist = require('minimist');
var knownOptions = {
  bool: [
    'themeforest'
  ],
  default: {
    'themeforest': false
  }
};

var options = minimist(process.argv.slice(2), knownOptions);


delete fonts.copy.php;


webpackPlugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.NoErrorsPlugin()
);

if (!options.themeforest) {
  // webpackPlugins.push(
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     sourceMap: true,
  //     warnings: true,
  //     mangle: true,
  //     compress: {
  //       drop_console: true
  //     }
  //   })
  // );
}

if (!options.themeforest) {
  config.build.dest = './build';
  config.build.destAssets = './build';
} else {
  config.build.dest = '../../themeforest/build/webelieve/assets';
  config.build.destAssets = '../../themeforest/build/webelieve/assets';
  config.docs = {dest: '../../themeforest/build/documentation'};
}

config.build.pubDestAssets = '';

if (options.themeforest) {
  config.target = 'themeforest';
} else {
  config.target = 'wp';
}

config.env = 'release';

config.js.webpack.app.devtool = false;
config.js.webpack.app.watch = false;
config.js.webpack.app.plugins = webpackPlugins;
config.js.webpack.app.output = {
  pathinfo: false
};

config.js.webpack.backendCustomizer.devtool = false;
config.js.webpack.backendCustomizer.watch = false;
config.js.webpack.backendCustomizer.plugins = webpackPlugins;
config.js.webpack.backendCustomizer.output.pathinfo = false;

// config.js.webpack.wpadmin.devtool = false;
// config.js.webpack.wpadmin.plugins = webpackPlugins;
// config.js.webpack.wpadmin.output.pathinfo = false;
config.fonts = fonts;


module.exports = config;