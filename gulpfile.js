var gulp = require('gulp')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var watch = require('gulp-watch')

gulp.task (
    'compile',
    [
        'compile-html',
        'compile-scss',
    ]
);

gulp.task(
    'compile-html',
    function () {
        gulp.src('src/**/*.html')
            .pipe(gulp.dest('app'));
    }
)

gulp.task(
    'compile-scss',
    function () {
        gulp.src('src/**/*.scss')
            .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
            .pipe(gulp.dest('app'))
    }
)

gulp.task(
    'watch',
    function () {
        gulp.watch('src/**/*', ['compile']);
    }
)
