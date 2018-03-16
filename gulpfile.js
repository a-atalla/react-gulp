const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('serve', () => {
  connect.server({
    base: 'http://127.0.0.1',
    port: 9090,
    root: './build',
    livereload: true
  })
});

gulp.task('js', () => {
  return browserify('./src/app.js')
    .transform(babelify, {presets: ['react', 'es2015']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('sass',  () => {
  return gulp.src('src/assets/sass/**/*.scss')
    .pipe(sass({
      style: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

gulp.task('fonts', () => {
  return gulp.src(['node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('build/fonts/'))
    .pipe(connect.reload());
});

gulp.task('default', ['js', 'html', 'fonts','sass', 'serve'],() => {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/sass/**/*.scss', ['sass']);
});
