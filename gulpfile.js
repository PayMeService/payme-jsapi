var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    scss = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imageMin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    babel = require('gulp-babel'),
    removeLines = require('gulp-remove-lines');
    notify = require("gulp-notify");

// Скрипты проекта

gulp.task('concat-libs-js', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js', //добавляем библиотеки
        'app/libs/bootstrap/dist/js/bootstrap.min.js'
        
        
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(scss({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('watch', ['scss', 'concat-libs-js', 'babel-common-js', 'browser-sync'], function () {
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch(['app/js/common.min.js'], ['babel-common-js'], browserSync.reload);
    gulp.watch(['app/js/exemple1.js'], ['babel-common-js'], browserSync.reload);
    gulp.watch(['app/js/exemple2.js'], ['babel-common-js'], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('babel-common-js', function () {
    return gulp.src(
        'app/js/common.min.js'
        )
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/js/babel-common'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image-min', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['remove-dist', 'image-min', 'scss'], function () {

    var buildFiles = gulp.src([
        'app/*.php',
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/libs.js',
        'app/js/babel-common/common.min.js', // Всегда в конце
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var removeLink = gulp.src('app/index.html')
        .pipe(removeLines({'filters': [
            /<script src="js\/libs.js"><\/script>/
        ]}))
        .pipe(gulp.dest('dist'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function () {

    var conn = ftp.create({
        host: 'hostname.com',
        user: 'username',
        password: 'userpassword',
        parallel: 10,
        log: gUtil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('remove-dist', function () {
    return del.sync('dist');
});

gulp.task('clear-cache', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
