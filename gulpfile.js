const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require("vinyl-source-stream");

function css() {
	const onError = (err) => {
		notify.onError({
			title: "CSS Error",
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

function js() {
	const onError = (err) => {
		notify.onError({
			title: "JS Error",
			subtitle: "build failed",
			message: "<%= error.message %>",
			sound: "Beep"
		})(err);

		this.emit('end');
	}

	return browserify({
			extensions: ['.js'],
			debug: true,
			cache: {},
			packageCache: {},
			fullPaths: true,
			entries: './src/js/altrone.js'
		})
		.transform(babelify.configure({
			presets: ["@babel/preset-env"],
			ignore: [/(node_modules)/]
		}))
		.bundle()
		.pipe(plumber({errorHandler: onError}))
		.pipe(source('altrone.bundle.js'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
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
	gulp.watch('src/js/**/*.js', js);
	// gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.watch = watch;
