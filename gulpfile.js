var gulp = require('gulp');
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var server = require('gulp-express');


gulp.task('sass', function(){
  return gulp.src('public/scss/*')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'views'
    },
  })
})

// gulp.task('watch', ['browserSync', 'sass'], function (){
//   gulp.watch('public/scss/*.scss', ['sass']);
//   // Reloads the browser whenever HTML or JS files change
//   gulp.watch('views/index.html', browserSync.reload);
//   gulp.watch('public/javascript/shorten.js', browserSync.reload);
//   gulp.watch('public/css/styles.css', browserSync.reload);
// });

gulp.task('server',function(){
  server.run(['app.js']);
  gulp.watch('public/scss/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('views/index.html', browserSync.reload);
  gulp.watch('public/javascript/shorten.js', browserSync.reload);
  gulp.watch('public/css/styles.css', browserSync.reload);
})
