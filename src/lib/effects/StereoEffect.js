import * as THREE from 'three';
import { StereoImagePanorama } from '../../panorama/StereoImagePanorama';
import { StereoVideoPanorama } from '../../panorama/StereoVideoPanorama';

/**
 * @classdesc Stereo Effect Composer
 * @constructor
 * @external StereoEffect
 * @param {THREE.WebGLRenderer} renderer 
 */
const StereoEffect = function ( renderer ) {

    var _stereo = new THREE.StereoCamera();
    _stereo.aspect = 0.5;
    var size = new THREE.Vector2();

    this.setEyeSeparation = function ( eyeSep ) {

        _stereo.eyeSep = eyeSep;

    };

    this.setSize = function ( width, height ) {

        renderer.setSize( width, height );

    };

    this.render = function ( scene, camera, panorama ) {

        scene.updateMatrixWorld();

        if ( camera.parent === null ) camera.updateMatrixWorld();
        
        if ( panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama ) this.setEyeSeparation( panorama.stereo.eyeSep );

        _stereo.update( camera );

        renderer.getSize( size );

        if ( renderer.autoClear ) renderer.clear();
        renderer.setScissorTest( true );

        if ( panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama ) panorama.updateTextureToLeft();

        renderer.setScissor( 0, 0, size.width / 2, size.height );
        renderer.setViewport( 0, 0, size.width / 2, size.height );
        renderer.render( scene, _stereo.cameraL );

        if ( panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama ) panorama.updateTextureToRight();

        renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
        renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
        renderer.render( scene, _stereo.cameraR );

        renderer.setScissorTest( false );

    };

};

export { StereoEffect };