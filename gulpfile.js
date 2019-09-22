const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const less=require('gulp-less');
const path=require('path');
const browserSync = require('browser-sync').create();

const cssFiles=[
    './node_modules/normalize.css/normalize.css',
    './src/css/some.css',
    './src/css/other.css',
];

const jsFiles=[
     './src/js/lib.js',
    './src/js/some.js',
];

const lessFiles=[
    './node_modules/normalize.css/normalize.css',
    './src/less/style.less'
];

function styles(){
    return gulp.src(cssFiles)
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
    }))
        .pipe(cleanCSS({
                level:2
            }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts(){
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(uglify({
            toplevel:true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function lessStyles(){
    return gulp.src(lessFiles)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}


function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/css/**/*.css',styles);
    gulp.watch('./src/js/**/*.js',scripts);
    gulp.watch('./src/less/**/*.less',lessStyles);
    gulp.watch("./*.html").on('change', browserSync.reload);
}

function clean(){
   return del(['build/*'])
}

gulp.task('styles',styles);
gulp.task('scripts',scripts);
gulp.task('lessStyle',lessStyles);
gulp.task('watch',watch);
gulp.task('clean',clean);


gulp.task('build', gulp.series(clean,
    gulp.parallel(styles,scripts,lessStyles))
);

gulp.task('dev', gulp.series('build','watch'));