/*jshint camelcase:false */
/**
 * Kickq
 * Kick jobs out the door, quickly.
 *
 * https://github.com/verbling/kickq
 *
 * Copyright (c) 2013 Verbling
 * Licensed under the MIT license.
 *
 * Authors:
 *   Thanasis Polychronakis (http://thanpol.as)
 *
 */

var reporterUse;

if ( 'true' === process.env.TRAVIS) {
  reporterUse = 'spec';
} else {
  reporterUse = 'spec';
}

module.exports = function( grunt ) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadTasks('tasks');

  //
  // Grunt configuration:
  //
  //
  grunt.initConfig({

    watch: {
      debug: {
        files: ['*.js', 'lib/**/*.js', 'tasks/**/*.js'],
        tasks: [
        ]
      },
      test: {
        files: ['*.js', 'lib/**/*.js', 'tasks/**/*.js', 'test/spec/**/*.js'],
        tasks: ['test']
      }
    },

    /**
     * TESTING
     *
     */
    clean: ['temp/*'],

    mochaTest: {
      itterative: [ 'test/spec/*.js' ]
    },

    mochaTestConfig: {
      itterative: {
        options: {
          // only add the tests that pass
          // grep: /(\s1\.1|\s1\.2|\s1\.4|\s1\.6|\s0\.0|\s2\.0|\s1\.3|\s1\.5)/,
          // grep: /(\s1\.1\.7)/,
          //
          // Shell version:
          // mocha -b test/spec/ -u tdd -g "1.1| 1.2| 1.4| 1.6| 0.0| 2.0| 1.3| 1.5" -R spec
          //
          ui: 'tdd',
          reporter: reporterUse
        }
      }
    },

    release: {
      options: {
        bump: true, //default: true
        file: 'package.json', //default: package.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: true, //default: true
        tagName: 'v<%= version %>', //default: '<%= version %>'
        commitMessage: 'releasing v<%= version %>', //default: 'release <%= version %>'
        tagMessage: 'v<%= version %>' //default: 'Version <%= version %>'
      }
    }

  });

  grunt.registerTask('test', [
    'clean',
    'mochaTest:itterative'
  ]);

  grunt.registerTask('test:console', [
    'clean',
    'mochaTest:itterative'
  ]);

  grunt.registerTask('default', ['test']);


};

