/*
 * grunt-codecov.io
 * https://github.com/r3b/grunt-codecov.io
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the APLv2 license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    codecov_io: {
      default_options: {
        options: {
          token: 'b1c6f68b-0029-4fad-aaa5-c8eaa8753953'
        },
        files: {report:'test/lcov.info'},
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'codecov_io']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
