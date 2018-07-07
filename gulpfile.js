let gulp = require('gulp');
let concat = require('gulp-concat');
let less = require('gulp-less');
let zip = require('gulp-zip');
let cssmin = require('gulp-cssmin');
let notify = require('gulp-notify');
let livereload = require('gulp-livereload');

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

gulp.task('less-lite', function() {
	return gulp.src('./css/altrone-lite.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(gulp.dest('./build/'))
		.pipe(livereload());
});

gulp.task('dist', function() {
	const version = '4.0RC';
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
