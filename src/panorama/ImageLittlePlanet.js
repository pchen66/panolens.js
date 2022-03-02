import { LittlePlanet } from './LittlePlanet';
import * as THREE from 'three';

/**
 * @classdesc Image Little Planet
 * @constructor
 * @param {string} source 		- URL for the image source
 * @param {number} [size=10000] - Size of plane geometry
 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
 */
class ImageLittlePlanet extends LittlePlanet {
    constructor( source, size, ratio ) {
        super(source, size, ratio);
    }


    /**
     * On loaded with texture
     * @param {THREE.Texture} texture
     * @memberOf ImageLittlePlanet
     * @instance
     */
    onLoad ( texture ) {

        this.updateTexture( texture );

        LittlePlanet.prototype.onLoad.call( this, texture );
    }
  
    /**
     * Update texture
     * @param {THREE.Texture} texture 
     * @memberOf ImageLittlePlanet
     * @instance
     */
    updateTexture ( texture ) {

        texture.minFilter = texture.magFilter = THREE.LinearFilter;
  
        this.material.uniforms[ 'tDiffuse' ].value = texture;

    }

    /**
     * Dispose
     * @memberOf ImageLittlePlanet
     * @instance
     */
    dispose () {

        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

        if ( tDiffuse && tDiffuse.value ) {

            tDiffuse.value.dispose();

        }

        LittlePlanet.prototype.dispose.call( this );

    }
}

export { ImageLittlePlanet };