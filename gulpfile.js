var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sym = require('gulp-sym');
var watch = require('gulp-watch');
var tsd = require('gulp-tsd');

gulp.task (
    'compile',
    [
        'compile-ts',
        'compile-html',
        'compile-scss',
        'compile-symlink'
    ]
);

gulp.task(
    'compile-ts',
    function () {
        tsResult = gulp.src('src/**/*.ts')
            .pipe(plumber())
            .pipe(
                ts({
                    target: 'es5',
                    module: 'commonjs',
                    declaration: true,
                    noExternalResolve: true
                })
            )
            .pipe(gulp.dest('app/'));
    }
);

gulp.task(
    'compile-html',
    function () {
        gulp.src('src/**/*.html')
            .pipe(gulp.dest('app'));
    }
);

gulp.task(
    'compile-scss',
    function () {
        gulp.src('src/**/*.scss')
            .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
            .pipe(gulp.dest('app'))
    }
);

gulp.task(
    'compile-symlink',
    function () {
        gulp.src('node_modules/font-awesome/fonts')
            .pipe(sym('app/renderer/fonts', { force: true }));
    }
);

gulp.task(
    'watch',
    function () {
        gulp.watch('src/**/*', ['compile']);
    }
);
