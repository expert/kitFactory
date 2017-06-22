var gulp = require('gulp');
var browserSync = require('browser-sync');
var sassnew = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var _ = require('lodash');
var tasks = [];
var importCss = require('gulp-import-css');
var config = require('config');
var minify = require('gulp-minify-css');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var firstStart = true;

gulp.task('sass', tasks, function () {
  if (firstStart === true) {
    firstStart = false;
  }
  // if (config.env !== 'dev') {
  //   gulp.start('sass:minify');
  // }


});

gulp.task('sass:minify', function () {
  return gulp.src([config.css.dest + '/**/*.css', '!'+config.css.dest + '/**/icons.css'])
    .pipe(minify())
    .pipe(gulp.dest(config.css.dest));
});

for (var name in config.css.entrySassFiles) {
  var taskName = 'sass:' + name;
  if (!config.css.entrySassFiles[name].independent) {
    tasks.push(taskName);
  }
  (function (name, taskName) {
    gulp.task(taskName, function (cb) {
      if (firstStart === true || config.css.entrySassFiles[name].recompileOnChange === true) {
        // console.log('recompileOnChange')
        // console.log(recompileOnChange)

        return compile(config.css.entrySassFiles[name].src, config.css.entrySassFiles[name]);
      }
      return cb;
    });
  })(name, taskName);
}

var rtlConf = {
  "name": "prev-next",
  "search": ["prev"],
  "replace": ["next"],
  options: {"ignoreCase": false}
};

function compile(input, file) {
  var cssFilter = gulpFilter(['**/vendor.css', '**/theme-*.css', '**/vendor-*.css'], {restore: true});
  // console.log(outputPath)
  var outputPath =  file.outputPath ? file.outputPath : config.css.dest;
  // var outputName =  file.outputName ? file.outputName : gulp.dest(config.css.dest);
  return gulp.src(input)
    .pipe(sassnew(config.css.compilerSettings).on('error', sassnew.logError))
    .pipe(autoprefixer(config.css.autoprefixer))
    .pipe(gulp.dest(outputPath))
    .pipe(importCss())
    .pipe(gulp.dest(config.css.dest))
    // .pipe(cssFilter)
    // .pipe(rtlcss([rtlConf])) // Convert to RTL.
    // .pipe(rename({suffix: '-rtl'})) // Append "-rtl" to the filename.
    // .pipe(gulp.dest(config.css.dest))
    .pipe(browserSync.reload({stream:true}));
}