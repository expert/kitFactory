var path = require('path');
var webpack = require('webpack');
var d = require('config/defer').deferConfig;

module.exports = {
  src: d(function (config) {
    return config.build.srcAssets + '/js';
  }),
  dest: d(function (config) {
    return config.build.destAssets + '/js';
  }),
  destGlob: d(function (config) {
    return config.build.destAssets + '/js/**/*.js';
  }),
  pubDest: d(function (config) {
    return config.build.pubDestAssets + 'js';
  }),
  copy: d(function (config) {
    return config.js.src + '/{demodata,demo}.js';
  }),
  webpack: {
    app: {
      watch: true,
      context: d(function (config) {
        return path.resolve(config.build.srcAssets);
      }),
      entry: {
        app: '.' + path.sep + path.join('js', 'app.js')
      },
      output: {
        path: d(function (config) {
          return path.resolve(config.build.destAssets);
        }),
        pathinfo: true,
        filename: "js/[name].js",
        chunkFilename: "js/vendor.[name].js",
        // library: 'app',
        // libraryTarget: 'var',
        publicPath: d(function (config) {
          return config.build.pubDestAssets;
        })
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
          }
        }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          PNotify: 'pnotify'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-us/),
        // new BowerWebpackPlugin({
        //   modulesDirectories: ["vendor"],
        //   manifestFiles: "bower.json",
        //   excludes: [
        //     /\.css/,
        //     /fonts/,
        //     /.(png|jpg|gif)/,
        //     /pnotify\.(buttons|callbacks|confirm|desktop|history|nonblock)/,
        //     /leaflet.js/,
        //     /\.(png|jpg|gif|svg|sass|less|scss)/,
        //     /pnotify\.(buttons|callbacks|confirm|desktop|history|nonblock)/,
        //     ///dist\/plyr\.js/,
        //     ///dist\\plyr\.js/
        //   ],
        //   searchResolveModulesDirectories: false
        // }),
        // new ExtractTextPlugin("css/[name].css", {
        //   //allChunks: true
        // }),
        // new SplitByPathPlugin([
        //   {
        //     name: 'vendor',
        //     path: [
        //       path.join(path.resolve('./'), 'node_modules'),
        //       path.join(path.resolve('./'), 'vendor')
        //     ]
        //   }
        // ])
      ],
      resolve: {
        extensions: ['.js']
      },
      module: {
        rules: [
          {test: /jquery\.js$/, loader: 'expose?$'},
          {test: /jquery\.js$/, loader: 'expose?jQuery'},
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
              name: 'fonts/fa/[name].[ext]'
            }
          }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
              name: 'fonts/fa/[name].[ext]'
            }
          }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
              name: 'fonts/fa/[name].[ext]'
            }
          }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
              name: 'fonts/fa/[name].[ext]'
            }
          }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
              name: 'fonts/fa/[name].[ext]'
            }
          }
        ]
      }
    }

  }
};
