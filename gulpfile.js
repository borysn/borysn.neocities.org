'use strict';

// packages
var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

// project vars
const build = {dir:'./build'};
const src = {
  sass:{files:'./src/sass/**/*.scss'},
  font:{files:'./node_modules/typeface-palanquin/files/*'},
  html:{files:'./src/**/*.html'},
  js:{files:'./src/js/**/*.js'},
  lib:{files:'./node_modules/particles.js/particles.js'}
};

// build sass
gulp.task('sass', function() {
  return gulp.src(src.sass.files)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer("last 3 version"))
  .pipe(cleancss())
  .pipe(gulp.dest(build.dir + '/css'));
});

// watch sass
gulp.task('sass:watch', function() {
  gulp.watch(src.sass.files, ['sass']);
});

// copy fonts
gulp.task('font:copy', function() {
  return gulp.src(src.font.files)
    .pipe(gulp.dest(build.dir + '/css/fonts'));
});

// copy html
gulp.task('html:copy', function() {
  return gulp.src(src.html.files)
  .pipe(gulp.dest(build.dir));
});

// watch html
gulp.task('html:watch', function() {
  gulp.watch(src.html.files, ['html:copy']);
});

// copy js
gulp.task('js:copy', function() {
  return gulp.src(src.js.files)
    .pipe(gulp.dest(build.dir + '/js'));
});

// watch js
gulp.task('js:watch', function() {
  gulp.watch(src.js.files, ['js:copy']);
});

// copy libs
gulp.task('lib:copy', function() {
  return gulp.src(src.lib.files)
    .pipe(gulp.dest(build.dir + '/js/libs'));
});

// clean
gulp.task('clean', function() {
  return del([build.dir]);
});

// build
gulp.task('build', ['sass', 'js:copy', 'lib:copy', 'font:copy', 'html:copy']);

// watch
gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch']);

// default task
gulp.task('default', ['build']);
