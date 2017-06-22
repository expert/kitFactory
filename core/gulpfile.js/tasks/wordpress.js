var assign = require('object-assign');
var config = require('config');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var gulpSequence = require('gulp-sequence');
var rename = require('gulp-rename');

gulp.task('build:devwp',
  //['bower'],
  function (cb) {
    //changelog
    global.isWatching = true;
    gulpSequence(
      'clean',
      [
        'images',
        'copy'
      ],
      [
        'sass',
        'sass:allThemes',
        'webpack',

        // 'webpack:wpadmin',
        // 'webpack:backendcustomizer'
      ],
      'webpack:fix-public-path',
      'watch',
      cb
    );
  });

gulp.task('build:wp',
  //['bower'],
  function (cb) {
    var tasks = [
      'clean',
      [
        'sass',
        'sass:allThemes'
      ],
      [
        'images',
        'copy'
      ]
    ];

    if (!config.args.themeforest) {
      tasks.push('sass:minify');
    }

    tasks.push([

      'webpack:wp',

      // 'webpack:wpadmin',
      // 'webpack:backendcustomizer'

    ])
    ;


    tasks.push(
      'webpack:fix-public-path',
      [
        'docs:build'
      ]
    );

    tasks.push(cb);
    gulpSequence.apply(this, tasks);
  });
gulp.task('webpack:wp', function (callback) {
  if (config.env === 'dev') {
    var built = false;

    webpack(config.js.webpack.app).watch(200, function (err, stats) {
      logger(err, stats);
      browserSync.reload();
      // On the initial compile, let gulp know the task is done
      if (!built) {
        built = true;
        callback();
      }

    })
  } else {
    config.js.webpack.app.watch = false;
    webpack(config.js.webpack.app, function (err, stats) {
      logger(err, stats);
      callback();
    });
  }
});


gulp.task('webpack:wpadmin', function (callback) {
  if (config.env === 'dev') {
    var built = false;

    webpack(config.js.webpack.wpadmin).watch(200, function (err, stats) {
      logger(err, stats);
      browserSync.reload();
      // On the initial compile, let gulp know the task is done
      if (!built) {
        built = true;
        callback();
      }

    })
  } else {
    webpack(config.js.webpack.wpadmin, function (err, stats) {
      logger(err, stats);
      gulpSequence('webpack:wpminify', callback);
    });
  }
});

gulp.task('webpack:backendcustomizer', function (callback) {
  if (config.env === 'dev') {
    var built = false;

    webpack(config.js.webpack.backendCustomizer).watch(200, function (err, stats) {
      logger(err, stats);
      browserSync.reload();
      // On the initial compile, let gulp know the task is done
      if (!built) {
        built = true;
        callback();
      }

    })
  } else {
    webpack(config.js.webpack.backendCustomizer, function (err, stats) {
      logger(err, stats);
      gulpSequence('webpack:wpminify', callback);
    });
  }
});


gulp.task('webpack:wpminify', function () {
  return gulp.src(config.js.dest + '/**/*.js')
  // .pipe(uglify())
    .pipe(gulp.dest(config.js.dest));
});
