var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sym = require('gulp-sym');
var watch = require('gulp-watch');

gulp.task (
    'compile',
    [
        // 'compile-js',
        'compile-ts',
        'compile-html',
        'compile-scss',
        'compile-symlink'
    ]
);

gulp.task(
    'compile-js',
    function () {
        return gulp.src('src/**/*.js')
            .pipe(plumber())
            .pipe(gulp.dest('app/'));
    }
);

gulp.task(
    'compile-ts',
    function () {
        tsResult = gulp.src('src/**/*.ts')
            .pipe(ts({
                declaration: true,
                noExternalResolve: true
            }));
    }

    return merge([
        tsResult.dts.pipe(gulp.dest('app/defs')),
        tsResult.js.pipe('app')
    ])
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
