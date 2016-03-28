var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
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

});	

gulp.task('watch', function(){
	gulp.watch(coffeeSource, ['coffee'])
	gulp.watch(jsSources, ['js'])
	gulp.watch('components/sass/*.scss', ['compass'])
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);