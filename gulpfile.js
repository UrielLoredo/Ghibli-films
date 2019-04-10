/* Dependences */
var gulp = require('gulp'),
  server = require('gulp-server-livereload'),
  pug = require('gulp-pug'),
  compass = require('gulp-compass'),
  coffee = require('gulp-coffee'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin')

/* Setup server */
gulp.task('webserver', function(){
  gulp.src('./dist')
  .pipe(server({
    path: './dist',
    directoryListing: false,
    port: 3000,
    open: true,
    livereload:{
      enable: true,
      port: 3010
    }
  }));
});

/* Setup pug */
gulp.task('pug', function(){
  var YOUR_LOCALS = {};
  gulp.src('./src/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
});

/* Setup compass */
gulp.task('compass', function(){
  gulp.src('./src/sass/**/*.*')
  .pipe(compass({
    config_file: './src/config.rb',
    css: 'src/compile/libs',
    sass: 'src/sass',
    scss: 'src/scss'
  }))
  .on('error', function(error){
    console.log(error);
  })
  .pipe(gulp.dest('src/compile'));
});

/* Setup coffee */
gulp.task('coffee', function(){
  gulp.src('./src/coffee/**/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('src/compile'))
});

/* Setup pug:watch */
gulp.task('pug:watch', function(){
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});

/* Setup compass:watch */
gulp.task('compass:watch', function(){
  gulp.watch('./src/sass/**/*.sass', ['compass']);
});

/* Setup coffee:watch */
gulp.task('coffee:watch', function(){
  gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
});

gulp.task('watch:js', function () {
  return watch(['src/compile/libs/**/*.js', 'src/compile/core.js'], function () {
    gulp.src(['src/compile/libs/**/*.js', 'src/compile/core.js'])
    .pipe(concat("core.js"))
    .pipe(uglify({keepSpecialComments : 0}))
    .pipe(gulp.dest('./dist/js/'));
  });
});

gulp.task('watch:css', function () {
  return watch(['src/compile/libs/**/*.css', 'src/compile/*.css'], function () {
    gulp.src(['src/compile/libs/**/*.css', 'src/compile/*.css'])
    .pipe(cssmin())
    .pipe(concat("styles.css"))
    .pipe(gulp.dest('./dist/css/'));
  });
});

gulp.task('init', ['pug:watch','compass:watch','coffee:watch', 'webserver','watch:css', 'watch:js']);