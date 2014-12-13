var cwd = __dirname;
var gulp = require('gulp');
var rename = require('gulp-rename');
var backend_path = cwd + '/../backend';
var js_path = cwd + '/js';
var scss_path = cwd + '/scss';
var dist_path = cwd + "/../backend/public";
var gulpIgnore = require('gulp-ignore');

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
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


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

gulp.task('lint:backend', function(){
    return gulp.src([backend_path + '/**/*.js', '!' + backend_path + '/public/**/*'])
            .pipe(jshint({esnext: true}))
            .pipe(jshint.reporter(stylish));
});

gulp.task('lint:frontend', function(){
    return gulp.src(js_path + '/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
});

gulp.task('watch:dev', function(){
    gulp.watch([backend_path + '/**/*.js', '!' + backend_path + '/public/**/*'], ['lint:backend']);
    gulp.watch(js_path + '/**/*.js', ['lint:frontend', 'build:dev:js']);
    gulp.watch(scss_path + '/**/*.scss', ['build:dev:scss']);
});