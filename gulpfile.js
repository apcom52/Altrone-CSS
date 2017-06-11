var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var filesize = require('gulp-filesize');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

// gulp.task('build', function() {
// 	return gulp.src('./js/*.js')
// 		.pipe(gulp.dest('./new_js'))
// });

gulp.task('build', function() {
	return browserify('./js/index.js')
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./new_js/'));
});