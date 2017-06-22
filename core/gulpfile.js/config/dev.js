module.exports = {
  target: 'tpl',
  env: 'dev',
  build: {
    dest: './build'
  },
  js: {
    webpack: {
      app: {
        devtool: 'cheap-module-eval-source-map',
        externals: {
          'jquery': 'jQuery'
        }
      }
    }
  },
  css: {
    entrySassFiles: {
      allThemes: {
        independent: true
      }
    }
  }
};