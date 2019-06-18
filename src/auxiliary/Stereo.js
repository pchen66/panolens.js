import { STEREOFORMAT } from '../Constants';
import * as THREE from 'three';

/**
 * @classdesc Stereo Mixin - format based on {@link https://opticalflow.wordpress.com/2010/09/19/side-by-side-versus-top-and-bottom-3d-formats/} will be determined by image width:height ratio (TAB is 1:1, SBS is 4:1)
 * @constructor
 * @param {number} [eyeSep=0.064] - eye separation distance
 */
function Stereo ( eyeSep = 0.064 ){

    this.format = null;
    this.eyeSep = eyeSep;

    this.loffset = new THREE.Vector2();
    this.roffset = new THREE.Vector2();

}

Object.assign( Stereo.prototype, {

    constructor: Stereo,

    /**
     * Update unifroms by stereo format
     * @param {integer} format - { @see STEREOFORMAT }
     * @param {object} uniforms
     */
    updateUniformByFormat: function( format, uniforms ) {

        this.format = format;

        const repeat = uniforms.repeat.value;
        const offset = uniforms.offset.value;
        const loffset = this.loffset;
        const roffset = this.roffset;

        switch ( format ) {

        case STEREOFORMAT.TAB:
            repeat.set( 1.0, 0.5 );
            offset.set( 0.0, 0.5 );
            loffset.set( 0.0, 0.5 );
            roffset.set( 0.0, 0.0 );
            break;

        case STEREOFORMAT.SBS:
            repeat.set( 0.5, 1.0 );
            offset.set( 0.0, 0.0 );
            loffset.set( 0.0, 0.0 );
            roffset.set( 0.5, 0.0 );
            break;

        default: break;

        }

    },

    /**
     * Update Texture for Stereo Left Eye
     */
    updateTextureToLeft: function( offset ) {

        offset.copy( this.loffset );

    },

    /**
     * Update Texture for Stereo Right Eye
     */
    updateTextureToRight: function( offset ) {

        offset.copy( this.roffset );

    }

} );

export { Stereo };