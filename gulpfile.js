var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var zip = require('gulp-zip');
var prompt = require('gulp-prompt');

gulp.task('js', function() {
	return gulp.src('./js/*.js')
		.pipe(concat('altrone.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('less', function() {
	return gulp.src('./css/altrone.less')
		.pipe(less())
		.pipe(gulp.dest('./build/'));
});

gulp.task('dist', function() {
	var version = '3.0';
	return gulp.src(['./build/**/*'])
		.pipe(zip(version + '.zip'))
		.pipe(gulp.dest('dist'))
});