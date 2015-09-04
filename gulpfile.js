var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')();
var ftp = require('vinyl-ftp');

gulp.task('styles-dev', compileStyles.bind(undefined, false));

gulp.task('watch-styles', ['styles-dev'], function() {
  log('Watching scss files');
  return gulp.watch(config.sass.source, ['styles-dev']);
});

gulp.task('styles-build', compileStyles.bind(undefined, true));

gulp.task('deploy', ['styles-build'], function() {
  var conn = ftp.create( {
      host:     config.ftp.host,
      user:     config.ftp.auth.user,
      password: config.ftp.auth.password,
      log: $.util.log
  });
  
  return gulp
      .src(config.ftp.source, { buffer: false })
      .pipe(conn.newerOrDifferentSize(config.ftp.dest)) // only upload newer files 
      .pipe($.print())
      .pipe(conn.dest(config.ftp.dest));
});

/////////////

function compileStyles(minify) {
  log('Compiling Less -> CSS');
  return gulp
    .src(config.sass.source, {base: config.sass.base})
    .pipe($.print())
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe($.concatCss(config.sass.bundle))
    .pipe($.if(minify, $.minifyCss()))
    .pipe($.print())
    .pipe(gulp.dest(config.sass.dest));
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
