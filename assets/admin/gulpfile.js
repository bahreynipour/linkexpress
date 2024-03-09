var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var concat = require('gulp-concat')
var csso = require('gulp-csso')
var rename = require('gulp-rename')
const terser = require('gulp-terser')
var pump = require('pump')


// compile scss
var scss = {
    in: 'app/scss/*.*',
    out: 'app/css/',
    watch: 'app/scss/**/*',
    sassOpts: {
        precison: 3,
        errLogToConsole: true
    }
};
gulp.task('sass', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});


// Minify css
gulp.task('minifycss', gulp.series(['sass'], function () {
    return gulp.src([
        'app/css/flexboxgrid.min.css',
        'app/css/main.css',
    ])
        .pipe(concat('linkexpress.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('linkexpress.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
    ;
}));

// Minify Scripts
gulp.task('minifyScripts', function (cb) {
    return pump([
            gulp.src([
                'app/js/base.js',
                'app/js/order.js',
                'app/js/main.js',
                'app/js/settings.js',
            ]),
            concat('linkexpress.js'),
            gulp.dest('dist/js'),
            rename('linkexpress.min.js'),
            terser(),
            gulp.dest('dist/js')
        ],
        cb
    )
});

// default task
gulp.task('watch', gulp.series(
    'minifycss',
    'minifyScripts',
        function () {
            gulp.watch(scss.watch, gulp.series('minifycss'));
            gulp.watch('app/js/**/*.*', gulp.series('minifyScripts'));
        }
    )
);