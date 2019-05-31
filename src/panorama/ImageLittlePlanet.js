import { LittlePlanet } from './LittlePlanet';
import { ImagePanorama } from './ImagePanorama';
import 'three';

/**
 * Image Little Planet
 * @constructor
 * @param {string} source 		- URL for the image source
 * @param {number} [size=10000] - Size of plane geometry
 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
 */
function ImageLittlePlanet ( source, size, ratio ) {

    LittlePlanet.call( this, 'image', source, size, ratio );

}

ImageLittlePlanet.prototype = Object.assign( Object.create( LittlePlanet.prototype ), {

    constructor: ImageLittlePlanet,

    onLoad: function ( texture ) {

        this.updateTexture( texture );

        LittlePlanet.prototype.onLoad.call( this );
        ImagePanorama.prototype.onLoad.call( this, texture );

    },
	
    updateTexture: function ( texture ) {

        texture.minFilter = texture.magFilter = THREE.LinearFilter;
		
        this.material.uniforms[ 'tDiffuse' ].value = texture;

    },

    dispose: function () {

        const tDiffuse = this.material.uniforms[ 'tDiffuse' ];

        if ( tDiffuse && tDiffuse.value ) {

            tDiffuse.value.dispose();

        }

        LittlePlanet.prototype.dispose.call( this );

    }

} );

export { ImageLittlePlanet };