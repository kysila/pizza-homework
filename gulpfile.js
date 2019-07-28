const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync'),
    image = require('gulp-image');

const path = {
    build: {
        html: 'build',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/',
        fonts: 'build/fonts'
    },
    src: {
        html: 'src/index.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/*.js',
        img: 'src/img/*.png)',
        fonts: 'src/fonts/*.ttf'
    },
    clean: './build/'
};

const htmlBuild = () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
};

const scssBuild = () => {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 100 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.build.css))
};

const jsBuild = () => {
    return gulp.src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(path.build.js))
};

const imgBuild = () => {
  return gulp.src("src/img/*.png")
      .pipe(image())
      .pipe(gulp.dest(path.build.img))
};

const fontsBuild = () => {
  return gulp.src('src/fonts/*.ttf')
      .pipe(gulp.dest(path.build.fonts))
};

const cleanBuild = () => {
    return gulp.src(path.clean, {allowEmpty: true})
        .pipe(clean());
};

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch(path.src.html, htmlBuild).on('change', browserSync.reload);
    gulp.watch(path.src.scss, scssBuild).on('change', browserSync.reload);
    gulp.watch(path.src.js, jsBuild).on('change', browserSync.reload);
    gulp.watch(path.src.img, imgBuild).on('change', browserSync.reload);
};

/****** GULP TASK ******/

gulp.task('html', htmlBuild);
gulp.task('scss', scssBuild);
gulp.task('js', jsBuild);
gulp.task('img', imgBuild);
gulp.task('fonts', fontsBuild);
gulp.task('clean', cleanBuild);

gulp.task('default', gulp.series(
    cleanBuild,
    imgBuild,
    htmlBuild,
    scssBuild,
    fontsBuild,
    jsBuild,
    watcher
));
