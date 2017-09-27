// Any processing of javascript should
// go in functions here

'use strict';

const harmony = require('uglify-js-harmony');
const minifier = require('gulp-uglify/minifier');
const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');
const jscs = require('gulp-jscs');
const jscsStylish = require('gulp-jscs-stylish');
const lazypipe = require('lazypipe'); // Lazy pipe creates a reusable pipe stream
const $ = require('gulp-load-plugins')();
const gulpif = require('gulp-if');
// Minify Javascript
function minify() {
  const uglifyOptions = {
    preserveComments: false
    // options
  };
  return minifier(uglifyOptions, harmony);
}

// Lint Javascript
const lint = lazypipe()
  .pipe(jshint)
  .pipe(jscs)
  .pipe(jscsStylish.combineWithHintResults)
  .pipe(jshint.reporter, jshintStylish)
  // Option to have js linting fail on error
  //.pipe(jshint.reporter, 'fail');
  .pipe(jshint.reporter);

const babelify = lazypipe()
  .pipe(()=> ($.if('*.html', $.crisper({scriptInHead:false}))))
  .pipe(()=> ($.if('*.js', $.babel({
    presets: ['es2017'],
    plugins: ['transform-object-rest-spread']
  }))));

module.exports = {
  babelify: babelify,
  minify: minify,
  lint: lint
};
