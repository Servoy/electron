// Gulp file for the extraction of the .NET functions in the OfficeScript project.
var gulp = require('gulp')
var exec = require('child_process').exec
var path = require('path')
var del = require('del')

var dest = './src/libraries/office/dist'
var src = './src/libraries/office/src/OfficeScript/OfficeScript/bin/Debug/*.dll'

gulp.task('build', ['deploy'], function () {});
gulp.task('deploy', ['clean', 'compile'], function () {
  // Copy .NET functions to /dist
  return gulp.src(src)
    .pipe(gulp.dest(dest))
});

gulp.task('compile', function (cb) {
  exec(`MSBuild ${path.normalize('./src/libraries/office/src/OfficeScript/OfficeScript.sln')} /clp:ErrorsOnly`, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
});

gulp.task('clean', function () {
  // clean /dist
  return del(dest)
});
