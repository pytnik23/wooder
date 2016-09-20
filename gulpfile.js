var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	imagemin 		= require('gulp-imagemin'),
	del		 		= require('del'),
	cache			= require('gulp-cache'),
	autoprefixer	= require('gulp-autoprefixer'),
	cssmin 			= require('gulp-cssmin'),
	useref 			= require('gulp-useref'),
	uglify 			= require('gulp-uglify'),
	pump 			= require('pump'),
	wiredep 		= require('wiredep').stream,
	gulpif 			= require('gulp-if'),
	runSequence 	= require('run-sequence');

gulp.task('bower', function () {
	gulp.src('app/index.html')
		.pipe(wiredep({
			directory: 'app/bower_components'
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('css', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['> 0%'], cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulp.dest('docs'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('imageMin', function() {
	gulp.src('app/images/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		})))
		.pipe(gulp.dest('docs/images'));
});

gulp.task('fonts', function() {
	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('docs/fonts'));
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('clean', function() {
	return del.sync('docs/');
});

gulp.task('build', function(callback) {
	runSequence('clean', 'css',
		['imageMin', 'useref', 'fonts'],
		callback
	);
});

gulp.task('default', ['browser-sync', 'css'], function() {
	gulp.watch('app/sass/**/*.sass', ['css']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('bower.json', ['bower']);
});