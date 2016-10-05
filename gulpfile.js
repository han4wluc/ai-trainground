
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
  gulp.watch(['app/**/*.js'], ['mocha']);
});

gulp.task('mocha', shell.task([
  'npm test',
], {
  env: { FORCE_COLOR: true }
}));
