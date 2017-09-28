// Any processing of javascript should
// go in functions here

'use strict';

const uglifyHarmony = require('uglify-js-harmony');
const minifier = require('gulp-uglify/minifier');
const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');
const jscs = require('gulp-jscs');
const jscsStylish = require('gulp-jscs-stylish');
const lazypipe = require('lazypipe'); // Lazy pipe creates a reusable pipe stream

// Minify Javascript
function minify() {
  var uglifyOptions = {
    preserveComments: false
    // options
  };
  return minifier(uglifyOptions, uglifyHarmony);
}

// Lint Javascript
var lint = lazypipe()
  .pipe(jshint)
  .pipe(jscs)
  .pipe(jscsStylish.combineWithHintResults)
  .pipe(jshint.reporter, jshintStylish)
  // Option to have js linting fail on error
  //.pipe(jshint.reporter, 'fail');
  .pipe(jshint.reporter);

module.exports = {
  minify: minify,
  lint: lint
};
