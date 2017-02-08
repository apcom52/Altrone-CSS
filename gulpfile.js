var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var zip = require('gulp-zip');
var prompt = require('gulp-prompt');
var minify = require('gulp-minify');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('default', function() {
	gulp.watch('./*.less', {interval: 500}, ['less']);
	gulp.watch('./js/*.coffee', {interval: 500}, ['js']);
	console.log('hello, gulp!');	
});

gulp.task('less', function() {
	console.log('less');
	return gulp.src('./altrone.+(less|css)')
		.pipe(less())
		// .pipe(csso())
		.pipe(gulp.dest('./'));
});

gulp.task('js', function() {
	console.log('js');
	return gulp.src('./js/*.coffee')
		.pipe(concat('altrone-coffee.js'))
		.pipe(coffee())
		.pipe(gulp.dest('./js/'));
});

gulp.task('dist', function() {
	console.log('Дистрибутив создан');
	var version = 'null';
	return gulp.src(['./altrone.css', './altrone.js', './fonts/*.otf', './fonts/*.woff'])
		.pipe(prompt.prompt({
			type: 'input',
			name: 'version',
			message: 'Input version of dist'
		}, function(result) {
			version = result.version;
			console.log(version);
		}))
		.pipe(zip(version + '.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	var b = browserify({ entries: 'altrone-react.jsx', extensions: ['.jsx'], debug: true });
	b.transform('babelify', { presets: ["es2015", "react"]})

	return b.bundle()
		.on('error', function(e) {
			console.log(e.toString());
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('jsx-watch', function() {
	gulp.watch('altrone-react.jsx', ['build']);
});

gulp.task('build-yoda', function() {
	var b = browserify({ entries: 'yoda-react.jsx', extensions: ['.jsx'], debug: true });
	b.transform('babelify', { presets: ["es2015", "react"]})

	return b.bundle()
		.on('error', function(e) {
			console.log(e.toString());
			this.emit('end');
		})
		.pipe(source('../../yoda/media/static/js/yoda_react.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('jsx-watchYoda', function() {
	gulp.watch('yoda-react.jsx', ['build-yoda']);
});