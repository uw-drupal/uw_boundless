let gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    lesshint = require('gulp-lesshint'),
    sourcemaps = require('gulp-sourcemaps');

// Establish paths object, so we can reference them below in the compiling functions
const paths = {
  less: {
    // this is our main entry point; within style.less we're then referencing
    // the parent theme and .less imports within this theme.
    src: './less/style.less',
    dest: './css',
    watch: './less/**/*.less',
  },
  cke5_less: {
    src: './less/ckeditor5.less',
    dest: './css',
    watch: './less/**/*.less',
  },
  css_vars: {
    src: './less/css-variables.less',
    dest: './css',
    watch: './less/**/*.less',
  },
  lessAll: {
    src: './less/**/*.less'
  }
}

// Compile less into CSS
function styles () {
  return gulp.src([paths.less.src])
    .pipe(sourcemaps.init())
    .pipe(less({compress: false}))
    // .pipe(autoprefixer('last 10 versions', 'ie 9'))
    // .pipe(cleanCSS())
    .pipe(gulp.dest(paths.less.dest))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.less.dest))
    // listen for errors
    .on('error', console.error.bind(console));
}

// Compile less into CSS for CKEditor5
function cke5_styles () {
  return gulp.src([paths.cke5_less.src])
    .pipe(sourcemaps.init())
    .pipe(less({compress: false}))
    // .pipe(autoprefixer('last 10 versions', 'ie 9'))
    // .pipe(cleanCSS())
    .pipe(gulp.dest(paths.less.dest))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.less.dest))
    // listen for errors
    .on('error', console.error.bind(console));
}

// Compile less into CSS variables.
function css_vars () {
  return gulp.src([paths.css_vars.src])
    .pipe(sourcemaps.init())
    .pipe(less({compress: false}))
    .pipe(gulp.dest(paths.less.dest))
    // .pipe(sourcemaps.write('./'))
    // .pipe(gulp.dest(paths.less.dest))
    .on('error', console.error.bind(console));
}

// Lint our files
function lint () {
  return gulp.src([paths.lessAll.src])
      .pipe(lesshint({
        // Options
      }))
      .pipe(lesshint.reporter())
      .pipe(lesshint.failOnError())
      .pipe(lesshint.failOnWarning());
}

// Watch less files for changes; run styles if anything changes
function watch () {
  gulp.watch(paths.less.watch, styles).on('change', styles);
}

exports.styles = styles
exports.cke5_styles = cke5_styles
exports.css_vars = css_vars
exports.lint = lint
exports.default = watch
