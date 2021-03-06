var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var uglifyjs = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

// configuration
var paths = {
    html: 'build/index.html',
    css: 'build/styles/*.css',
    sass: 'build/styles/sass/*.scss',
    scripts: 'build/scripts/*.js',
    fontawesome: 'build/fontawesome/**/*',
    images: 'build/img/*'
};

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('clean', function() {
    return del(['app'])
});

gulp.task('cssreset', function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(rename('normalize.min.css'))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});

// gulp.task('styles', function() {
//     return gulp.src(paths.css)
//         .pipe(autoprefixer())
//         .pipe(concatCss('style.css'))
//         .pipe(cssmin())
//         .pipe(rename('style.min.css'))
//         .pipe(gulp.dest('app/styles'))
//         .pipe(browserSync.stream());
// });

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concatCss('style.css'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglifyjs())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('app/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('addFontAwesome', function() {
    return gulp.src(paths.fontawesome)
        .pipe(gulp.dest('app/styles/fontawesome'))
});

gulp.task('addImages', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('app/img'))
});

gulp.task('build', function(callback) {
    runSequence('clean', ['html', 'cssreset', 'sass', 'scripts', 'addFontAwesome', 'addImages', 'browser-sync', 'watch'],
        callback
    )
});

gulp.task('watch', function() {
    //gulp.watch(paths.css, ['styles']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.html, ['html']);
});