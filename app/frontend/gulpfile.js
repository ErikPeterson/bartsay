var cwd = __dirname;
var gulp = require('gulp');
var rename = require('gulp-rename');

var js_path = cwd + '/js';
var scss_path = cwd + '/scss';
var dist_path = cwd + "/../backend/public";

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build:dev:scss', function(){
    gulp.src(scss_path + '/main.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(rename('css/app.css'))
        .pipe(gulp.dest(dist_path));
});

var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');


gulp.task('build:dev:js', function(){

  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

    return gulp.src(js_path + '/app.js')
        .pipe(sourcemaps.init())
            .pipe(browserified)
            .pipe(sourcemaps.write())
        .pipe(rename('js/app.js'))
        .pipe(gulp.dest(dist_path));
});

gulp.task('watch:dev', function(){
    gulp.watch(js_path + '/**/*.js', ['build:dev:js']);
    gulp.watch(scss_path + '/**/*.scss', ['build:dev:scss']);
});