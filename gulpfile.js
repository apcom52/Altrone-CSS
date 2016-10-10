var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var zip = require('gulp-zip');
var prompt = require('gulp-prompt');
var minify = require('gulp-minify');


gulp.task('default', function() {
	gulp.watch('./*+(less|js)', {interval: 500}, ['less']);
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
	return gulp.src('./altrone.js')
		.pipe(uglify())
		.pipe(gulp.dest('./'));
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