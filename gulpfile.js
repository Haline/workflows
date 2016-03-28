var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSource = ['components/coffee/tagline.coffee'];  
var jsSources = [
'components/scripts/tagline.js',
'components/scripts/template.js'
];
var sassSource = ['components/sass/style.scss']

gulp.task('coffee', function() {
	gulp.src(coffeeSource)
		.pipe(coffee({ bare: true })
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))	
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});
	
gulp.task('compass', function(){
	gulp.src(sassSource)
		.pipe(compass({
			sass: 'components/sass',
			images: 'builds/development/images',
			style: 'expanded'
		})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});	

gulp.task('watch', function(){
	gulp.watch(coffeeSource, ['coffee'])
	gulp.watch(jsSources, ['js'])
	gulp.watch('components/sass/*.scss', ['compass'])
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload: true

	});
});

gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);