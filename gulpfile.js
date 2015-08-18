'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');
var connect =  require('gulp-connect');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var path = require('path');

gulp.task('svg', function() {
  gulp.src(['assets/images/logo.svg', 'assets/images/pp-logomark.svg', 'assets/images/slalom-logo.svg'])
  .pipe(svgmin(function(file) {
    var prefix = path.basename(file.relative, path.extname(file.relative));
    return {
      plugins: [{
        cleanupIDs: {
          prefix: prefix + '-',
          minify: true
        }
      }]
    }
  }))
  .pipe(svgstore())
  .pipe(gulp.dest('assets/images'));
})

gulp.task('sass', function() {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions']})
    ]))
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./*.html')
  .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['sass', 'connect', 'watch'])
