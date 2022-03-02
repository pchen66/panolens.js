import { Panorama } from './Panorama';
import { CubeTextureLoader } from '../loaders/CubeTextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Cubemap-based panorama
 * @constructor
 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
 */
class CubePanorama extends Panorama {
    constructor ( images = [] ) {

        const edgeLength = 10000;
        const shader = Object.assign( {}, THREE.ShaderLib[ 'cube' ] );
        const geometry = new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );
        const material = new THREE.ShaderMaterial( {

            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            side: THREE.BackSide,
            transparent: true

        } );

        super(geometry, material);

        this.images = images;
        this.edgeLength = edgeLength;
        this.material.uniforms.opacity.value = 0;

    }

    /**
     * Load 6 images and bind listeners
     * @memberOf CubePanorama
     * @instance
     */
    load () {

        CubeTextureLoader.load( 	

            this.images, 

            this.onLoad.bind( this ), 
            this.onProgress.bind( this ), 
            this.onError.bind( this ) 

        );

    }

    /**
     * This will be called when 6 textures are ready
     * @param  {THREE.CubeTexture} texture - Cube texture
     * @memberOf CubePanorama
     * @instance
     */
    onLoad ( texture ) {
		
        this.material.uniforms[ 'tCube' ].value = texture;

        Panorama.prototype.onLoad.call( this );

    }

    /**
     * Dispose
     * @memberOf CubePanorama
     * @instance
     */
    dispose () {	

        const { value } = this.material.uniforms.tCube;

        this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

        if ( value instanceof THREE.CubeTexture ) {

            value.dispose();

        }

        Panorama.prototype.dispose.call( this );

    }
}

export { CubePanorama };