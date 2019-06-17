import { LittlePlanet } from './LittlePlanet';
import * as THREE from 'three';

/**
 * @classdesc Image Little Planet
 * @constructor
 * @param {string} source 		- URL for the image source
 */
function ImageLittlePlanet ( source ) {

    LittlePlanet.call( this, 'image', source );

    this.type = 'image_little_planet';

}

ImageLittlePlanet.prototype = Object.assign( Object.create( LittlePlanet.prototype ), {

    constructor: ImageLittlePlanet,

    /**
     * On loaded with texture
     * @param {THREE.Texture} texture
     * @memberOf ImageLittlePlanet
     * @instance
     */
    onLoad: function ( texture ) {

        this.updateTexture( texture );

        LittlePlanet.prototype.onLoad.call( this, texture );

    },
    
    /**
     * Update texture
     * @param {THREE.Texture} texture 
     * @memberOf ImageLittlePlanet
     * @instance
     */
    updateTexture: function ( texture ) {

        texture.minFilter = texture.magFilter = THREE.LinearFilter;
		
        this.material.uniforms[ 'tDiffuse' ].value = texture;

    },

    /**
     * Dispose
     * @memberOf ImageLittlePlanet
     * @instance
     */
    dispose: function () {

        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

        if ( tDiffuse && tDiffuse.value ) {

            tDiffuse.value.dispose();

        }

        LittlePlanet.prototype.dispose.call( this );

    }

} );

export { ImageLittlePlanet };