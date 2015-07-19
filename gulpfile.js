var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var _ = require('lodash');

gulp.task('default', function() {
    bundle(true);
    gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist'));
});

function bundle(watch) {
    var bro;

    if (watch) {
        bro = watchify(browserify('./src/app/app.js',
            // Assigning debug to have sourcemaps
            _.assign(watchify.args, {
                debug: true
            })));
        bro.on('update', function() {
            rebundle(bro);
        });
    } else {
        bro = browserify('./src/app/app.js', {
            debug: true
        });
    }

    bro.transform(babelify.configure({
        compact: false
    }));
    bro.transform(ngAnnotate);

    function rebundle(bundler) {
        return bundler.bundle()
            .on('error', function(e) {
                console.error('Browserify Error', e);
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            })) // loads map from browserify file
            .pipe(sourcemaps.write()) // writes .map file
            .pipe(gulp.dest('dist/js'))
            .pipe(gulpif(watch,
                browserSync.reload({
                    stream: true,
                    once: true
                })));
    }

    return rebundle(bro);
}