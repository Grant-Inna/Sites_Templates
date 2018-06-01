var gulp = require('gulp'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    groupMedia = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify");


gulp.task( 'browser', function() {
    browserSync.init({
        server: {
            baseDir: 'production/'
        }
    });
});

gulp.task( 'copyFonts', function() {
    return gulp.src( 'src/font/*.{ttf,woff,woff2,eot,svg}' )
        .pipe(gulp.dest( 'production/font/' ))
});

gulp.task('imageMIN', function() {
    return gulp.src( 'src/img/*.{png,jpg,jpeg,svg}' )
        .pipe(imagemin())
        .pipe(gulp.dest( 'production/img/' ))
        .pipe(notify('Images Compress Success!'));
});

gulp.task('imageMINDir', function() {
    return gulp.src( 'src/img/**/*.{png,jpg,jpeg,svg}' )
        .pipe(imagemin())
        .pipe(gulp.dest( 'production/img/**/' ))
        .pipe(notify('Images Compress Success!'));
});

gulp.task('CSS', function() {
    return gulp.src( 'src/css/style.less' )
        .pipe(less().on('error', console.info))
        .pipe(groupMedia())
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 2%']}))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest( 'production/css/' ))
        .pipe(notify('CSS Success!'));
});


gulp.task('watch_CSS', ['browser'], function() {
    gulp.watch('src/css/*.less', ['CSS']);
    gulp.watch('src/css/*.less').on('change', browserSync.reload)
});


gulp.task('watch_imageMIN', function() {
    gulp.watch('src/img/*.{png,jpg,jpeg,svg}', ['imageMIN']);
    gulp.watch('src/img/**/*.{png,jpg,jpeg,svg}', ['imageMINDir']);
    gulp.watch('src/img/*.{png,jpg,jpeg,svg}').on('change', browserSync.reload)
});

gulp.task('watch_JADE', ['browser'], function() {
    gulp.watch('src/*.jade', ['jade']);
    gulp.watch('src/jade/*.jade', ['jade']);
    gulp.watch('src/*.jade').on('change', browserSync.reload)
});

gulp.task('jade', function() {
    return gulp.src( 'src/index.jade' )
        .pipe(jade())
        .pipe(gulp.dest( 'production/' ))
});



gulp.task('default', ['copyFonts', 'CSS', 'jade', 'watch_JADE', 'watch_CSS', 'imageMIN', 'watch_imageMIN']);
gulp.task('images', ['imageMIN', 'watch_imageMIN']);