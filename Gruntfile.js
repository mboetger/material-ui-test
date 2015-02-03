module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      browserify: {
        'public/javascripts/bundles/login.js': [
          'app/login/**/*.js',
          'app/login/**/*.coffee'
        ],
        'public/javascripts/bundles/admin-users.js': [
          'app/admin/users/**/*.js',
          'app/admin/users/**/*.coffee'
        ],
        'public/javascripts/bundles/admin-clients.js': [
          'app/admin/clients/**/*.js',
          'app/admin/clients/**/*.coffee'
        ],
        options: {
          transform: [require('grunt-react').browserify, 'coffeeify']
        }
      },
      uglify: {
        production: {
          files: {
            'public/javascripts/bundles/login.js': 'public/javascripts/bundles/login.js',
            'public/javascripts/bundles/admin-users.js': 'public/javascripts/bundles/admin-users.js',
            'public/javascripts/bundles/admin-clients.js': 'public/javascripts/bundles/admin-clients.js'

          }
        }
      },
    });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-react');
};
