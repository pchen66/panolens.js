var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
var jsdoc = require("gulp-jsdoc");
var runSequence = require('run-sequence');

var _libfiles = [
	'src/lib/three.min.js',
	'src/lib/OrbitControls.js',
	'src/lib/DeviceOrientationControls.js',
	'src/lib/GSVPano.js',
	'src/lib/Tween.js'
];

var _panolensfiles = [
	'src/Panolens.js',
	'src/panorama/Panorama.js',
	'src/panorama/ImagePanorama.js',
	'src/panorama/GoogleStreetviewPanorama.js',
	'src/panorama/CubePanorama.js',
	'src/panorama/VideoPanorama.js',
	'src/widget/*.js',
	'src/infospot/*.js',
	'src/viewer/*.js'
];

gulp.task( 'default', [ 'gulp-closure-compiler', 'gulp-jsdoc' ] );

gulp.task( 'gulp-closure-compiler', function() {
  return gulp.src( _libfiles.concat( _panolensfiles ) )
    .pipe( closureCompiler ( {
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: 'build/panolens.min.js',
      compilerFlags: {
      	language_in: 'ECMASCRIPT6',
      	language_out: 'ECMASCRIPT5_STRICT'
      }
    } ) )
    .pipe( gulp.dest( 'build' ) )
});

gulp.task( 'gulp-jsdoc', function() {
  return gulp.src( _panolensfiles )
    .pipe( jsdoc('docs' ) )
    .pipe( gulp.dest( 'build' ) )
});