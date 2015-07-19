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
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var _ = require('lodash');

var paths = {

    js: {
        files: './src/app/**/*.js',
        src: './src/app/app.js',
        name: 'bundle.js',
        dest: './dist/js'
    },
    html: {
        files: './src/app/**/*.html',
        dest: './dist'
    },
    styles: {
        src: './src/app/sass',
        files: './src/app/sass/**/*.scss',
        bootstrap: './node_modules/bootstrap-sass/assets/stylesheets',
        dest: './dist/css'
    }

};

var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

gulp.task('build-js', function() {
    browserify(paths.js.src)
        .transform(babelify.configure({
            compact: false
        }))
        .transform(ngAnnotate)
        .bundle()
        .on('error', function(e) { displayError(e); })
        .pipe(source(paths.js.name))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // loads map from browserify file
        .pipe(sourcemaps.write()) // writes .map file
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('build-static', function() {
    gulp.src(paths.html.files)
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('build-styles', function (){
    // Taking the path from the above object
    gulp.src(paths.styles.files)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths : [paths.styles.src, paths.styles.bootstrap]
        }))
        .on('error', function(e) { displayError(e); })
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('default', ['build-static', 'build-js', 'build-styles'], function() {
    gulp.watch(paths.html.files, ['build-static'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=app)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });

    gulp.watch(paths.js.files, ['build-js'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=app)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });

    gulp.watch(paths.styles.files, ['build-styles'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });
});