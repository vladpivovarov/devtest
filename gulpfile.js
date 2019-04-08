"use strict";

const gulp = require("gulp");
const gp = require("gulp-load-plugins")();
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');
const bs = require('browser-sync').create();
const fs = require('fs');

// ИЗМЕНЯЮЩИЙСЯ БЛОК --открыт
const src = "./src/";
const dist = "./dist/";

const srcPath = {
  js:     `${src}scripts/main.js`,
  scss:   `${src}style/main.scss`,
  img:    `${src}images/**/*.*`,
  fonts:  `${src}fonts/**/*.*`,
  sprite: `${src}sprite/`,
  php:    `${src}php/**/*.*`,
  htacc:  `${src}php/.htaccess`
};

const distPath = {
  js:     `${dist}assets/scripts/`,
  css:    `${dist}assets/style/`,
  img:    `${dist}assets/images/`,
  fonts:  `${dist}assets/fonts/`,
  sprite: `${dist}assets/images/`,
  php:    `${dist}`
};
// ИЗМЕНЯЮЩИЙСЯ БЛОК --закрыт

// js 
// сторонние сss-библиотеки подключаем в style.js (преобразуется в foundation.css)
// сторонние js-библиотеки  подключаем в webpack.config.js (ProvidePlugin)
gulp.task("js", () => {
  return gulp.src(srcPath.js)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(dist))
});

// sass
gulp.task("sass", () => {
  return gulp.src(srcPath.scss)
	.pipe(gp.sourcemaps.init())
    .pipe(gp.sassGlob())
	.pipe(gp.sass())
	.on("error", gp.notify.onError((err) => {
	  return {
		title: "Sass",
		message: err.message
	  }
    }))
	.pipe(gp.autoprefixer({
      browsers: ["last 3 version", "> 1%", "ie 8", "ie 9"]
    }))
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest(distPath.css))
});

// копирование шрифтов
gulp.task("font:copy", () => {
  return gulp.src(srcPath.fonts)
    .pipe(gulp.dest(distPath.fonts))
});

// копирование img
gulp.task("img:copy", () => {
  return gulp.src(srcPath.img)
    .pipe(gulp.dest(distPath.img))
})

// копирование php
gulp.task("php:copy", () => {
  return gulp.src(srcPath.php)
    .pipe(gulp.dest(distPath.php))
})

gulp.task("htacc:copy", () => {
  return gulp.src(srcPath.htacc)
    .pipe(gulp.dest(distPath.php))
})

// спрайт из svg
gulp.task('sprite:svg', () => {
  return gulp.src(`${srcPath.sprite}**/*.svg`)
    .pipe(gp.svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gp.cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gp.replace('&gt;', '>'))
    .pipe(gp.svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(distPath.img))
});

// удаление dist
gulp.task("clean", () => {
  return del(dist);
});

// слежка за изменениями в src и запуск задач
gulp.task("watch", () => {
  gulp.watch(`${src}style/**/*.*`, gulp.series("sass"));
  gulp.watch(`${src}scripts/**/*.*`, gulp.series("js"));
  gulp.watch(srcPath.img, gulp.series("img:copy"));
  gulp.watch(srcPath.fonts, gulp.series("font:copy"));
  gulp.watch(srcPath.php, gulp.series("php:copy", "htacc:copy"));
});

// запуск сервера на dist и перезагрузка сервера при изменениях в dist
gulp.task("serve", () => {
  bs.init({
    open: true,
    proxy: "devtest"
  });
  bs.watch(`${dist}**/*.*`).on("change", bs.reload);
});

gulp.task("default", gulp.series(
  "clean",
	gulp.parallel(          
    "sass",
    "js",     
    "php:copy",
    "htacc:copy",
    "font:copy",
    "img:copy", 
    "sprite:svg",
	),
	gulp.parallel(
    "watch",
    "serve"
    )
));