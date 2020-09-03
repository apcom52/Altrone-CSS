const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

function css() {
	const onError = (err) => {
		notify.onError({
			title: "Gulp",
			subtitle: "build failed",
			message: "Error: <%= error.message %>",
			sound: "Pop"
		})(err);

		this.emit('end');
	}

	return gulp.src('src/scss/altrone.scss')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
}

function html() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './dist',
			index: '/index.html',
			cors: true
		},
		tunnel: true
	});
	gulp.watch('src/scss/**/*.scss', css);
	gulp.watch('src/index.html', html);
	// gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.css = css;
exports.html = html;
exports.watch = watch;