try {
  require('./gulp.ftp.auth');
} catch (e) {
  if (!e.code || e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
  console.log([
    'Error: ' + e.message,
    'Please create file gulp.ftp.auth.js with the form:\n',
    'module.exports = {',
    '  user: \'[username]\'',
    '  password: \'[password]\'',
    '}'
  ].join('\n'))
  process.exit(1);
}

module.exports = function() {
  var config = {
    sass: {
      source: [
        'css/*.scss',
        '!css/_*.scss'
      ],
      base: '.',
      bundle: './style.css',
      dest: ''
    },
    ftp: {
      host: 'ierfh.org',
      auth: require('./gulp.ftp.auth'),
      secure: true,
      source: [
        '**/*',
        '!*.js*',
        '!typings',
        '!typings/**/*',
        '!node_modules',
        '!node_modules/**/*'
      ],
      dest: '/www.ierfh.org/wp/wp-content/themes/expound-ierfh/'
    }
  };
  
  return config;
}