var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var _libfiles = [
    'node_modules/iphone-inline-video/dist/iphone-inline-video.min.js',
    'node_modules/tween.js/src/Tween.js',
    'src/lib/controls/OrbitControls.js',
    'src/lib/controls/DeviceOrientationControls.js',
    'src/lib/modifier/BendModifier.js',
    'src/lib/effects/CardboardEffect.js',
    'node_modules/three/examples/js/effects/StereoEffect.js',
    'src/lib/GSVPano.js'
];

var _onlineResouces = [
    'src/DataImage.js',
];

var _offlineResouces = [
    'src/DataImage-offline.js',
];

var _panolensfiles = [
    'src/Panolens.js',
    'src/Constants.js',
    'src/util/Utils.js',
    'src/util/ImageLoader.js',
    'src/util/TextureLoader.js',
    'src/util/CubeTextureLoader.js',
    'src/shaders/StereographicShader.js',
    'src/panorama/Panorama.js',
    'src/panorama/ImagePanorama.js',
    'src/panorama/GoogleStreetviewPanorama.js',
    'src/panorama/CubePanorama.js',
    'src/panorama/BasicPanorama.js',
    'src/panorama/VideoPanorama.js',
    'src/panorama/EmptyPanorama.js',
    'src/panorama/LittlePlanet.js',
    'src/panorama/ImageLittlePlanet.js',
    'src/interface/Reticle.js',
    'src/interface/Tile.js',
    'src/interface/TileGroup.js',
    'src/interface/SpriteText.js',
    'src/widget/Widget.js',
    'src/infospot/Infospot.js',
    'src/viewer/Viewer.js',
    'src/util/font/Bmfont.js'
];

var _readme = [
    'README.md'
];

var jsdocConfig = {
    opts: {
        destination: './docs'
    },
    templates: {
        outputSourceFiles: true,
        theme: 'paper'
    }
};

var _sources = _panolensfiles.slice( 0, 1 )
    .concat( _libfiles )
    .concat( _onlineResouces )
    .concat( _panolensfiles.slice( 1 ) );

var _offline_sources = _panolensfiles.slice( 0, 1 )
    .concat( _libfiles )
    .concat( _offlineResouces )
    .concat( _panolensfiles.slice( 1 ) );

gulp.task( 'default', [ 'mini', 'docs' ] );
gulp.task( 'mini', [ 'minify', 'minify-offline' ] );

gulp.task( 'minify', function() {
  return gulp.src( _sources )
    .pipe( concat( 'panolens.js', { newLine: ';' } ) )
    .pipe( gulp.dest( './build/' ) )
    .pipe( concat( 'panolens.min.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( './build/' ) );
});

gulp.task( 'minify-offline', function () {
  return gulp.src( _offline_sources )
    .pipe( concat( 'panolens-offline.js', { newLine: ';' } ) )
    .pipe( gulp.dest( './build/' ) )
    .pipe( concat( 'panolens-offline.min.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( './build/' ) );
});

gulp.task( 'docs', function() {
  return gulp.src( _panolensfiles.concat( _readme ), {read: false} )
    .pipe( jsdoc( jsdocConfig ) );
});