//Global
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

var fs = require('fs');

//Data
var rename = require('gulp-rename');
//Server
var connect = require('gulp-connect');
var serve = require('gulp-serve');
//Flatten folder
var flatten = require('gulp-flatten');

//javascript
var uglify = require('gulp-uglify');


gulp.task('server', serve('dist'));

gulp.task('copy-assets', function() {
    gulp.src('./assets/**/*.{png,jpg,gif,svg,mp4,obj,gltf}')
    // Perform minification tasks, etc here
    .pipe(flatten())
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy-html', function() {
    gulp.src('./*.html')
    // Perform minification tasks, etc here
    .pipe(flatten())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){
  return gulp.src('./js/*.js')
    .pipe( sourcemaps.init() )
      .pipe( gulp.dest('./dist/js') )
      .pipe( uglify() )
      .pipe( rename({ suffix: '.min' }) )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('./dist/js') );
});


gulp.task('watch', function(){
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('build', ['copy-assets', 'copy-html','js']);
gulp.task('default', ['server', 'copy-assets', 'copy-html','js', 'watch']);
