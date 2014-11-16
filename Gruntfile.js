module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      browserify: {
        'public/javascripts/bundles/login.js': [
          'app/login/**/*.js',
          'app/login/**/*.coffee'
        ],
        options: {
          transform: [require('grunt-react').browserify, 'coffeeify']
        }
      },
      uglify: {
        production: {
          files: {
            'public/javascripts/login.js': 'public/javascripts/login.js'
          }
        }
      },
    });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-react');
}
