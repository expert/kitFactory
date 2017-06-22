var gulp = require('gulp');
var shell = require('gulp-shell');
// TODO
// casperjs test tests/testsuite.js --engine=slimerjs
// casperjs test tests/testsuite.js --engine=slimerjs --mode=build
// casperjs test tests/testsuite.js --engine=slimerjs --mode=prod
// casperjs test tests/testsuite.js --engine=slimerjs --mode=build --verbose --log-level=debug
// gulp.task('test:regression', shell.task(['casperjs test tests/testsuite.js --engine=slimerjs'], {cwd: '/Users/alexei/projects/wp_webelieve/site/assets'} ));