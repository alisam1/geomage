"use strict";

const gulp = require("gulp");
const { series } = gulp;

const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const svgstore = require("gulp-svgstore");

// Удаление папки build
exports.clean = async function () {
  const delModule = await import("del");
  return delModule.deleteAsync(["build"]);
};

// Компиляция стилей
function styles() {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

// Генерация SVG-спрайта
function sprite() {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

// Копирование изображений (без сжатия)
function images() {
  return gulp.src("source/img/**/*").pipe(gulp.dest("build/img"));
}

// Копирование остальных файлов
function copy() {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/js/**",
        "source/css/**",
        "source/**/*.html"
      ],
      { base: "source" }
    )
    .pipe(gulp.dest("build"));
}

// Обработка HTML с инклудами
function html() {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
}

// Локальный сервер и слежка
function serve() {
  browserSync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", styles);
  gulp.watch("source/*.html", series(html, (done) => {
    browserSync.reload();
    done();
  }));
}

// Последовательная сборка
const build = series(
  exports.clean,
  gulp.parallel(copy, images),
  styles,
  sprite,
  html
);

// Экспорты
exports.styles = styles;
exports.sprite = sprite;
exports.images = images;
exports.copy = copy;
exports.html = html;
exports.serve = serve;
exports.build = build;
exports.default = series(build, serve);
