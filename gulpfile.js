var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

var _libfiles = [
	'node_modules/three/examples/js/controls/DeviceOrientationControls.js',
	'node_modules/three/examples/js/controls/VRControls.js',
	'node_modules/three/examples/js/effects/VREffect.js',
	'node_modules/webvr-polyfill/build/webvr-polyfill.js',
	'node_modules/webvr-boilerplate/build/webvr-manager.js',
	'node_modules/tween.js/src/Tween.js',
	'src/lib/OrbitControls.js',
	'src/lib/GSVPano.js',
	'src/lib/modifier/BendModifier.js',
];

var _panolensfiles = [
	'src/Panolens.js',
	'src/util/DataIcon.js',
	'src/util/TextureLoader.js',
	'src/panorama/Panorama.js',
	'src/panorama/ImagePanorama.js',
	'src/panorama/GoogleStreetviewPanorama.js',
	'src/panorama/CubePanorama.js',
	'src/panorama/BasicPanorama.js',
	'src/panorama/VideoPanorama.js',
	'src/panorama/EmptyPanorama.js',
	'src/interface/Tile.js',
	'src/interface/TileGroup.js',
	'src/interface/SpriteText.js',
	'src/widget/*.js',
	'src/infospot/*.js',
	'src/viewer/*.js',
	'src/util/font/Bmfont.js'
];

var _readme = [
	'README.md'
];

gulp.task( 'default', [ 'minify', 'docs' ] );

gulp.task( 'minify', function() {
  return gulp.src( _libfiles.concat( _panolensfiles ) )
  	.pipe( concat( 'panolens.js', { newLine: ';' } ) )
  	.pipe( stripDebug() )
  	.pipe( gulp.dest( './build/' ) )
  	.pipe( concat( 'panolens.min.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( './build/' ) );
});

gulp.task( 'docs', function() {
  return gulp.src( _panolensfiles.concat( _readme ) )
    .pipe( jsdoc( 'docs' ) );
});