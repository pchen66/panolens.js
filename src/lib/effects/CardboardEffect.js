
import * as THREE from 'three';
import { StereoImagePanorama } from '../../panorama/StereoImagePanorama';
import { StereoVideoPanorama } from '../../panorama/StereoVideoPanorama';

/**
 * @classdesc Google Cardboard Effect Composer
 * @constructor
 * @external CardboardEffect
 * @param {THREE.WebGLRenderer} renderer 
 */
function CardboardEffect ( renderer ) {

    const _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

    const _scene = new THREE.Scene();

    const _stereo = new THREE.StereoCamera();
    _stereo.aspect = 0.5;

    const _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

    const _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
    _renderTarget.scissorTest = true;
    _renderTarget.texture.generateMipmaps = false;

    /*
     * Distortion Mesh ported from:
     * https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js
     */

    const distortion = new THREE.Vector2( 0.441, 0.156 );

    const geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).removeAttribute( 'normal' ).toNonIndexed();

    const positions = geometry.attributes.position.array;
    const uvs = geometry.attributes.uv.array;

    // duplicate
    geometry.attributes.position.count *= 2;
    geometry.attributes.uv.count *= 2;

    const positions2 = new Float32Array( positions.length * 2 );
    positions2.set( positions );
    positions2.set( positions, positions.length );

    const uvs2 = new Float32Array( uvs.length * 2 );
    uvs2.set( uvs );
    uvs2.set( uvs, uvs.length );

    const vector = new THREE.Vector2();
    const length = positions.length / 3;

    for ( let i = 0, l = positions2.length / 3; i < l; i ++ ) {

        vector.x = positions2[ i * 3 + 0 ];
        vector.y = positions2[ i * 3 + 1 ];

        const dot = vector.dot( vector );
        const scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

        const offset = i < length ? 0 : 1;

        positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
        positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

        uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

    }

    geometry.attributes.position.array = positions2;
    geometry.attributes.uv.array = uvs2;

    //

    const material = new THREE.MeshBasicMaterial( { map: _renderTarget.texture } );
    const mesh = new THREE.Mesh( geometry, material );
    _scene.add( mesh );

    //

    this.setEyeSeparation = function ( eyeSep ) {

        _stereo.eyeSep = eyeSep;

    };

    this.setSize = function ( width, height ) {

        renderer.setSize( width, height );

        const pixelRatio = renderer.getPixelRatio();

        _renderTarget.setSize( width * pixelRatio, height * pixelRatio );

    };

    this.render = function ( scene, camera, panorama ) {

        const stereoEnabled = panorama instanceof StereoImagePanorama || panorama instanceof StereoVideoPanorama;

        scene.updateMatrixWorld();

        if ( stereoEnabled ) this.setEyeSeparation( panorama.stereo.eyeSep );

        if ( camera.parent === null ) camera.updateMatrixWorld();

        _stereo.update( camera );

        const width = _renderTarget.width / 2;
        const height = _renderTarget.height;

        if ( renderer.autoClear ) renderer.clear();

        if ( stereoEnabled ) panorama.updateTextureToLeft();

        _renderTarget.scissor.set( 0, 0, width, height );
        _renderTarget.viewport.set( 0, 0, width, height );
        renderer.setRenderTarget( _renderTarget );
        renderer.render( scene, _stereo.cameraL );

        renderer.clearDepth();

        if ( stereoEnabled ) panorama.updateTextureToRight();

        _renderTarget.scissor.set( width, 0, width, height );
        _renderTarget.viewport.set( width, 0, width, height );
        renderer.setRenderTarget( _renderTarget );
        renderer.render( scene, _stereo.cameraR );

        renderer.clearDepth();

        renderer.setRenderTarget( null );
        renderer.render( _scene, _camera );
    };

};

export { CardboardEffect };