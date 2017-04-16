/**
 * Created by Павел on 10.04.2017.
 */
let gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyjs"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    del = require("del"),
    cache = require("gulp-cache"),
    babel = require("gulp-babel"),
    autoprefixer = require("gulp-autoprefixer"),
    browserify = require("gulp-browserify");

gulp.task("sass", () => {
    return gulp.src("src/sass/main.sass")
        .pipe(sass())
        .pipe(autoprefixer([
            "last 15 version", ">1%", "ie 8", "ie 7"
        ], {cascade: true}))
        .pipe(gulp.dest("src/css"))
        .pipe(cssnano())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("src/css"));
});

gulp.task("browser-sync", () => {
    browserSync({
        server: {
            baseDir: "src"
        },
        notify: false
    });
});

gulp.task("babel", () => {
    return gulp.src("src/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("src/js"))
        /*.pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("src/js"))*/;
});

gulp.task("browserify",()=>{
    return gulp.src("src/js/main.js")
        .pipe(browserify(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        })))
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("src"));
});

gulp.task("js-libs",()=>{
    return gulp.src(["src/js/react.js","src/js/react-dom.js"])
        .pipe(concat("libs.js"))
        .pipe(gulp.dest("src/js"));
});

gulp.task("watch",["babel", "browserify", "sass", "js-libs", "browser-sync"], () => {
    gulp.watch("src/es6/**/*.js", ["babel"]);
    gulp.watch("src/sass/**/*", ["sass", browserSync.reload]);
    gulp.watch("src/index.html", browserSync.reload);
    gulp.watch("src/js/main.js", ["browserify", browserSync.reload]);
});

gulp.task("default", ["watch"]);