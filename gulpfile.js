var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function()
{
  return gulp.src('./src/assets/scss/bootstrap/custom-theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/'));
});
