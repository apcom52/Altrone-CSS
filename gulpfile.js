var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var zip = require('gulp-zip');
var cssmin = require('gulp-cssmin');
var minify = require('gulp-minify');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('js', function() {
	return gulp.src('./js/*.js')
		.pipe(concat('altrone.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('less', function() {
	return gulp.src('./css/altrone.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('./build/'))
		.pipe(livereload());
});

gulp.task('dist', function() {
	var version = '3.0.2';
	return gulp.src(['./build/**/*'])
		.pipe(zip(version + '.zip'))
		.pipe(notify({
			title: "Altrone-CSS",
			message: "Дистрибутив готов"
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('less-watch', function() {
	livereload.listen();
	gulp.watch('./css/**/*', ['less']);
});

gulp.task('js-watch', function() {
    livereload.listen();
    gulp.watch('./js/**', ['js']);
});
