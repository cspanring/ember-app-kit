module.exports = {

  // Note: These tasks are listed in the order in which they will run.

  javascriptToTmp: {
    files: [{
      expand: true,
      cwd: 'app',
      src: '**/*.js',
      dest: 'tmp/javascript/app'
    },
    {
      expand: true,
      cwd: 'tests',
      src: ['**/*.js', '!test_helper.js', '!test_loader.js'],
      dest: 'tmp/javascript/tests/'
    }]
  },

  cssToResult: {
    expand: true,
    cwd: 'app/styles',
    src: ['**/*.css'],
    dest: 'tmp/result/assets'
  },

  // Assembles everything in `tmp/result`.
  // The sole purpose of this task is to keep things neat. Gathering everything in one
  // place (tmp/dist) enables the subtasks of dist to only look there. Note: However,
  // for normal development this is done on the fly by the development server.
  assemble: {
    files: [{
      expand: true,
      cwd: 'tests',
      src: ['test_helper.js', 'test_loader.js'],
      dest: 'tmp/result/tests/'
    }, {
      expand: true,
      cwd: 'public',
      src: ['**'],
      dest: 'tmp/result/'
    }, {
      src: ['vendor/**/*.js', 'vendor/**/*.css'],
      dest: 'tmp/result/'
    },

    // Bootstrap fonts
    {
      expand: true,
      cwd: 'vendor/bootstrap/',
      src: ['fonts/*.{eot,svg,ttf,woff}'],
      dest: 'tmp/result/'
    }, 

    // Leaflet images
    {
      expand: true,
      cwd: 'vendor/leaflet-stable/',
      src: ['images/*.png'],
      dest: 'tmp/result/assets/'
    }]
  },

  imageminFallback: {
    files: '<%= imagemin.dist.files %>'
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/result',
      src: [
        '**',
        '!**/*.{css,js}', // Already handled by concat
        '!**/*.{png,gif,jpg,jpeg}', // Already handled by imagemin
        '!tests/**/*', // No tests, please
        '!**/*.map' // No source maps
      ],
      filter: 'isFile',
      dest: 'dist/'
    }]
  },
};
