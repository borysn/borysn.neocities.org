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
  html:{files:'./src/**/*.html'}
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

// copy html
gulp.task('html:copy', function() {
	return gulp.src(src.html.files)
	.pipe(gulp.dest(build.dir));
});

// watch html
gulp.task('html:watch', function() {
  gulp.watch(src.html.files, ['html:copy']);
});

// clean
gulp.task('clean', function() {
	return del([build.dir]);
});

// build
gulp.task('build', ['sass', 'html:copy']);

// watch
gulp.task('watch', ['sass:watch', 'html:watch']);

// default task
gulp.task('default', ['build']);
