var path = require('path');
var packageBasePath = './webelieve';
var release_config = require('./release');

release_config.env = 'themeforest';
release_config.target = 'tpl';
release_config.themeforest = {
  repo: '/home/chetzof/Work/wp_webelieve',
  repoPath: 'webelieve.dev/web/app/themes/webelieve/assets',
  dest: packageBasePath,
  srcDest: packageBasePath + '/template-src',
  privateSrc: [
    packageBasePath + '/template-src/src/assets/js/wp.js',
    packageBasePath + '/template-src/src/assets/js/demowp.js',
    packageBasePath + '/template-src/src/assets/js/wp',
    packageBasePath + '/template-src/gulpfile.js/tasks/themeforest.js',
    packageBasePath + '/template-src/gulpfile.js/tasks/wordpress.js',
    packageBasePath + '/template-src/gulpfile.js/config/devwp.js',
    packageBasePath + '/template-src/gulpfile.js/config/themeforest.js',
    packageBasePath + '/template-src/gulpfile.js/config/wordpress-release.js',
    packageBasePath + '/template-src/misc'
  ],
  docUrl: 'https://media.readthedocs.org/htmlzip/webelieve/latest/webelieve.zip',
  zipName: 'webelieve.zip',
  zipDest: './',
  preprocessPaths: [
    packageBasePath + '/template-src/src/assets/js/demo.js'
  ],
  replaceWithPlaceholdersPath: packageBasePath + '/template-src/src/assets/media-demo'
};
release_config.docs = {
  dest: path.join(packageBasePath, 'docs')
};
release_config.build = {
  dest: packageBasePath + "/template"
};
release_config.images = {
  srcDemo: packageBasePath + '/template-src/src/assets/media-demo'
};

module.exports = release_config;