const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const cssFiles=[
    './node_modules/normalize.css/normalize.css',
    './src/css/some.css',
    './src/css/other.css',
]

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
        .pipe(gulp.dest('./build/css'));
}

function scripts(){

}

gulp.task('styles',styles);
gulp.task('scripts',scripts);