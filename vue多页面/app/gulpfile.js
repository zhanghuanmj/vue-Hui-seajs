/**
 * @author: zhanghuan
 * @create: 2018/1/22
 * @describe: gulp配置文件
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var size = require('gulp-size');
var prefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sassLint = require('gulp-sass-lint');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var babel = require("gulp-babel");
var changed = require('gulp-changed');
var server = require('gulp-devserver');//代理

/******代理配置************************/
gulp.task('devserver', function () {
  gulp.src('./')
    .pipe(server({
      port: 8080,
      livereload: {
        clientConsole: true
      },
      proxy: {
        enable: true,
        host: 'https://partners.npmjs.com',
        urls: /^\/API\//
      }
    }));
});


/******sass编译配置************************/
var sassOptions = {
  outputStyle: 'expanded'
};

/******浏览器前缀配置************************/
var prefixerOptions = {
  browsers: ['last 2 versions']
};

/******错误输出方法************************/
var onError = function (err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Basso"
  })(err);
  this.emit('end');
};

/******浏览器同步************************/
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './'
    },
    port: 8000
  });
});

/******清除dist文件夹************************/
gulp.task('clean:dist', function () {
  return gulp.src('dist/')
    .pipe(vinylPaths(del));
});

/******样式编译************************/
gulp.task('styles', function () {
  return gulp.src(['**/*.scss', '!node_modules/**/*.scss', '!lib/**/*.scss'])
    /*.pipe(changed('dist/', {extension: '.css'}))*/
    .pipe(changed('./', {extension: '.css'}))
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(prefix(prefixerOptions))
    .pipe(cleanCSS({debug: true}, function (details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(size({gzip: true, showFiles: true}))
    /*.pipe(rename({ suffix: '.min' }))*/
    /*.pipe(gulp.dest('dist/'))*/
    .pipe(gulp.dest('./'));
});

/******sass代码审查************************/
gulp.task('sass-lint', function () {
  gulp.src(['static/scss/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/******合并引用js************************/
gulp.task('js-concat', function () {
  //合并引用js
  gulp.src(['sea.js', 'seajs.text.js', 'seajs-css.js', 'seajs-preload.js', 'sea.config.js'])
    .pipe(changed('dist/'))//此处如果不输出到其他路径，直接写成'./'最终无法输出（原因未知）
    .pipe(uglify())
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(concat('app.min.js'))//合并
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('./'));
});

/******js压缩************************/
gulp.task('js-min', function () {
  gulp.src(['js/**/*.js'])
    .pipe(changed('dist/js/'))
    .pipe(babel())
    .pipe(uglify({
      mangle: false//类型：Boolean 默认：true 是否修改变量名
    }))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/js/'));

  gulp.src(['tpl/**/*.js'])
    .pipe(changed('dist/tpl/'))
    .pipe(babel())
    .pipe(uglify({
      mangle: false//类型：Boolean 默认：true 是否修改变量名
    }))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/tpl/'));
});

/******html文件压缩************************/
gulp.task('minify-html', function () {
  gulp.src(['**/*.html', '!node_modules/**/*.html', '!lib/**/*.html'])
    .pipe(changed('dist/'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));

  gulp.src('tpl/**/*.tpl')
    .pipe(changed('dist/tpl/'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/tpl/'));
});

/******复制文件************************/
gulp.task('copy', function () {

  // 把静态文件复制到dist下
  gulp.src('lib/**/*.*')
    .pipe(changed('dist/lib'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/lib'));

  gulp.src(['static/**/*.*', '!static/images/*.*', '!static/style/**/*.scss'])
    .pipe(changed('dist/static'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/static'));

  gulp.src(['tpl/**/*.css'])
    .pipe(changed('dist/tpl'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/tpl'));

  gulp.src(['favicon.ico'])
    .pipe(changed('dist/'))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest('dist/'));
});

/******img文件压缩************************/
gulp.task('imagemin', function () {
  return gulp.src('static/images/**/*.*')
    .pipe(changed('dist/static/images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/static/images'));
});

/******watch监听************************/
gulp.task('watch', function () {
  gulp.watch(['**/*.scss', '!node_modules/**/*.scss', '!lib/**/*.scss'], ['styles']);
  gulp.watch(['sea.config.js'], ['js-concat']);
});

/******gulp默认任务************************/
gulp.task('default', function (done) {
  runSequence(
    /*'browser-sync',*/
    'styles',
    'js-concat',
    'devserver',
    'watch',
    done);
}).on('task_stop', function () {
  //console.log('修改已编译.....');
});

/******gulp编译任务************************/
gulp.task('build', function (done) {
  runSequence('clean:dist',
    'styles',
    'js-min',
    'minify-html',
    'js-concat',
    'copy',
    'imagemin',
    done);
});