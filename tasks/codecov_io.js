/*
 * grunt-codecov.io
 * https://github.com/r3b/grunt-codecov.io
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the APLv2 license.
 */

'use strict';
var build_info=require("grunt-build-info");
var merge = require("merge");
var sendToCodeCov=require('../lib/sendToCodeCov');
module.exports = function(grunt) {
  grunt.registerMultiTask('codecov_io', 'Submit Istanbul code coverage reports to codecov.io', function() {
    var options = this.options({
      token: (process.env.codecov_token || process.env.CODECOV_TOKEN),
    });
    options=merge(options, build_info());
    this.files.forEach(function(f) {
      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        sendToCodeCov(options, grunt.file.read(filepath), function(err) {
          if (err) {
            console.log("error sending to codecov.io: ", err, err.stack);
            if (/non-success response/.test(err.message)){
              console.log("detail: ", err.detail);
            }else{
              console.log("SUCCESS");
            }
            throw err;
          }
        });
        grunt.log.writeln('File "' + filepath + '" submitted.');
      });

      // Write the destination file.
      // grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('Report "' + f.dest + '" sent.');
    });

  });

};
