import { Panorama } from './Panorama';
import { CubeTextureLoader } from '../loaders/CubeTextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Cubemap-based panorama
 * @constructor
 * @param {array} images - Array of 6 urls to images, one for each side of the CubeTexture. The urls should be specified in the following order: pos-x, neg-x, pos-y, neg-y, pos-z, neg-z
 */
function CubePanorama ( images = [] ){

    Panorama.call( this );

    this.images = images;
    this.type = 'cube_panorama';

}

CubePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: CubePanorama,

    /**
     * Create material
     * @memberOf CubePanorama
     * @instance
     */
    createMaterial: function() {

        const { fragmentShader, vertexShader, uniforms: _uniforms } = THREE.ShaderLib[ 'cube' ];
        const uniforms = THREE.UniformsUtils.clone( _uniforms );
        
        uniforms.opacity.value = 0;

        const material = new THREE.ShaderMaterial( {

            fragmentShader,
            vertexShader,
            uniforms,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0

        } );

        return material;

    },

    /**
     * Load 6 images and bind listeners
     * @memberOf CubePanorama
     * @instance
     */
    load: function () {

        Panorama.prototype.load.call( this, false );

        CubeTextureLoader.load( 	

            this.images, 

            this.onLoad.bind( this ), 
            this.onProgress.bind( this ), 
            this.onError.bind( this ) 

        );

    },

    /**
     * This will be called when 6 textures are ready
     * @param  {THREE.CubeTexture} texture - Cube texture
     * @memberOf CubePanorama
     * @instance
     */
    onLoad: function ( texture ) {
		
        this.material.uniforms[ 'tCube' ].value = texture;

        Panorama.prototype.onLoad.call( this );

    },

    getTexture: function () {

        return this.material.uniforms.tCube.value;

    },

    /**
     * Dispose
     * @memberOf CubePanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tCube;

        this.images.forEach( ( image ) => { THREE.Cache.remove( image ); } );

        if ( value instanceof THREE.CubeTexture ) {

            value.dispose();

        }

        Panorama.prototype.dispose.call( this );

    }

} );

export { CubePanorama };