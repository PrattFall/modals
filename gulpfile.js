const gulp = require("gulp");

const del = require("del");

const cleancss = require("gulp-clean-css");
const connect = require("gulp-connect");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");

const paths = {
  scripts: "src/assets/js/**/*",
  styles: "src/assets/styles/**/*",
  html: "src/*.html",
  images: "src/assets/img/**/*",
};

const clean = async () => {
  del(["build"]);
};

const page = async () => {
  gulp.src(paths.html).pipe(gulp.dest("build"));
};

const scripts = async () => {
  gulp
    .src(paths.scripts)
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build"));
};

const styles = async () => {
  gulp
    .src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest("build"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleancss())
    .pipe(gulp.dest("build"));
};

const images = async () => {
  gulp.src(paths.images).pipe(gulp.dest("build/img"));
};

const watch = async () => {
  gulp.watch(paths.scripts, scripts);
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.html, page);
  gulp.watch(paths.images, images);

  connect.server({
    root: "build",
    livereload: true,
  });
};

const build = async () => {
  console.log("Startig build");
  gulp.series(clean, gulp.parallel(scripts, styles, page, images));
};

exports.build = build;
exports.images = images;
exports.page = page;
exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;

exports.default = build;
