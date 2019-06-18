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

    const _stereo = new THREE.StereoCamera();
    _stereo.aspect = 0.5;
    const size = new THREE.Vector2();

    this.setEyeSeparation = function ( eyeSep ) {

        _stereo.eyeSep = eyeSep;

    };

    this.setSize = function ( width, height ) {

        renderer.setSize( width, height );

    };

    this.render = function ( scene, camera, panorama ) {

        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

        scene.updateMatrixWorld();

        if ( camera.parent === null ) camera.updateMatrixWorld();
        
        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

        _stereo.update( camera );

        renderer.getSize( size );

        if ( renderer.autoClear ) renderer.clear();
        renderer.setScissorTest( true );

        if ( stereoEnabled ) panorama.updateTextureToLeft();

        renderer.setScissor( 0, 0, size.width / 2, size.height );
        renderer.setViewport( 0, 0, size.width / 2, size.height );
        renderer.render( scene, _stereo.cameraL );

        if ( stereoEnabled ) panorama.updateTextureToRight();

        renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
        renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
        renderer.render( scene, _stereo.cameraR );

        renderer.setScissorTest( false );

        if ( stereoEnabled ) panorama.updateTextureToLeft();

    };

};

export { StereoEffect };