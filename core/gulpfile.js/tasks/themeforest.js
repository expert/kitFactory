var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var config = require('config');
var del = require('del');
var fs = require('fs');
var version = null;

gulp.task('build:themeforest', [
  'bower',
  'tf:clean-temp-folder'
], function (cb) {
  gulpSequence(
    'tf:create-base-dir',
    'tf:ask-version',
    'tf:create-version-file',
    'tf:checkout',
    [
      'tf:create-placeholders',
      'tf:delete-private',
      'docs:build'
    ],
    'build:release',
    'tf:zip',
    'tf:clean-temp-folder',
    cb
  );
});

gulp.task('tf:create-base-dir', function (cb) {
  fs.existsSync(config.themeforest.dest) || fs.mkdirSync(config.themeforest.dest);
  cb();
});

gulp.task('tf:ask-version', function (cb) {
  var inquirer = require('inquirer');
  inquirer.prompt([{
    name: 'version',
    message: 'Git ref?'
  }], function (answers) {
    version = answers.version;
    cb();
  });
});


gulp.task('tf:checkout', function (cb) {
  var shell = require('gulp-shell');
  var gitRef = version + ':' + config.themeforest.repoPath;
  var checkout =
    'mkdir -p ' + config.themeforest.srcDest + '; ' +
    'cd ' + config.themeforest.srcDest + ';' +
    'git archive --format=tar ' +
    '--remote=' + config.themeforest.repo + ' ' + gitRef +
    '| tar xf - ;';
  return gulp.src('').pipe(shell(checkout, {interactive: true}));

});

gulp.task('tf:delete-private', function (cb) {
  del(config.themeforest.privateSrc, cb);
});

gulp.task('tf:create-version-file', function (cb) {
  var path = require('path');
  require('fs').writeFileSync('./webelieve/VERSION.txt', version);
  cb();
});

gulp.task('tf:zip', ['tf:clean-old-zip'], function () {
  var zip = require('gulp-zip');
  return gulp.src(config.themeforest.dest + '/**')
    .pipe(zip(config.themeforest.zipName))
    .pipe(gulp.dest(config.themeforest.zipDest))
    ;
});

gulp.task('tf:clean-old-zip', function (cb) {
  del([
    config.themeforest.zipDest + config.themeforest.zipName
  ], cb);
});

gulp.task('tf:clean-temp-folder', function (cb) {
  del([
    config.themeforest.dest
  ], cb);
});


var urlTemplate = function (width, height) {
  return `http://placehold.it/${width}x${height}&text=Placeholder`;
};

//gulp.task('tf:replace-images-in-html', function (cb) {
//  return replaceImages(config.html.dest, config.html.destGlob, [
//    /(assets\/media-demo\/.*?\.jpg)/g,
//    /(assets\/media-demo\/partners\/.*?\.png)/g
//  ]);
//});
//
//gulp.task('tf:replace-images-in-jade', function (cb) {
//  return replaceImages(config.html.src, config.html.srcGlob, [
//    /(\#\{path\.media\}\/partners\/.*?\.png)/g,
//    /(\#\{path\.media\}.*?\.jpg)/g,
//  ]);
//});

gulp.task('tf:create-placeholders', function (cb) {
  var fs = require('fs');
  var sizeOf = require('image-size');
  var async = require('async');
  var _ = require('lodash');
  var path = config.themeforest.replaceWithPlaceholdersPath;
  var glob = require('glob');
  var request = require('request');

  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      console.log('Created placeholder for', filename);
    });
  };


  glob(path + '/**/*.*', function (err, files) {
    async.each(files, function (file, callback) {
      var size = sizeOf(file);
      var url = urlTemplate(size.width, size.height);
      download(url, file, callback);
    }, function () {
      return cb();
    });
  });
});

gulp.task('tf:preprocess', function () {
  var preprocess = require('gulp-preprocess');
  return gulp.src(config.themeforest.preprocessPaths, {base: './'})
    .pipe(preprocess())
    .pipe(gulp.dest('./'));
});


function replaceImages(srcFiles, srcGlob, regexes) {
  var fs = require('fs');
  var sizeOf = require('image-size');
  var async = require('async');
  var _ = require('lodash');
  var replace = require('gulp-batch-replace');

  var filePath = function (fileName) {
    return srcFiles + '/' + fileName;
  };

  var files = [];
  var matches = [];
  var replacementPairs = [];

  fs.readdirSync(srcFiles).forEach(function (file) {
    if (!fs.statSync(filePath(file)).isDirectory()) {
      files.push(file);
    }
  });

  files.forEach(function (file) {
    var content = fs.readFileSync(filePath(file), {encoding: 'utf8'});
    regexes.forEach(function (regex) {
      var localMatches = content.match(regex);
      if (localMatches !== null) {
        matches = matches.concat(localMatches);
      }
    });
  });

  matches = _.compact(_.unique(matches));

  async.each(matches, function (imageFile, callback) {
    var path = filePath(imageFile);
    sizeOf(path, function (err, size) {
      replacementPairs.push([imageFile, urlTemplate(size.width, size.height)]);
      callback();
    });
  }, function () {
    return gulp.src(srcGlob, {base: './'})
      .pipe(replace(replacementPairs))
      .pipe(gulp.dest('./'));
  });
}
