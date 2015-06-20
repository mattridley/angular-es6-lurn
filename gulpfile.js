var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-tsc');

var tsAppPath = 'src/app/';
var tsOutputPath = 'dist/js/';

gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [tsOutputPath,
        tsAppPath + '**/*.js',
        tsAppPath + '**/*.js.map'
    ];

    del(typeScriptGenFiles, cb);
});

gulp.task('compile-ts', function(){
    gulp.src(['src/app/**/*.ts'])
        .pipe(typescript())
        .pipe(gulp.dest(tsOutputPath))
});

gulp.task('watch', function() {
    gulp.watch([tsAppPath + '**/*.ts'], ['compile-ts', 'gen-ts-refs']);
});

gulp.task('default', ['compile-ts', 'watch']);