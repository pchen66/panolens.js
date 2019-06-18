import { STEREOFORMAT } from '../Constants';
import { ImagePanorama } from './ImagePanorama';
import * as THREE from 'three';
import { Stereo } from '../auxiliary/Stereo';

/**
 * @classdesc Stereo Image Panorama
 * @constructor
 * @param {string} src - image source
 * @param {number} [stereo=new Stereo()] - stereo mixin
 */
function StereoImagePanorama ( src, stereo = new Stereo() ){

    ImagePanorama.call( this, src );

    this.stereo = stereo;
    this.type = 'stereo_image_panorama';

}

StereoImagePanorama.prototype = Object.assign( Object.create( ImagePanorama.prototype ), {

    constructor: StereoImagePanorama,

    /**
     * This will be called when texture is ready
     * @param  {THREE.Texture} texture - Image texture
     * @memberOf StereoImagePanorama
     * @instance
     */
    onLoad: function ( texture ) {

        const { width, height } = texture.image;
        let format = null;

        if ( width / height === 4 ) { 
            
            format = STEREOFORMAT.SBS;
        
        } else { 

            format = STEREOFORMAT.TAB;
        
        }

        this.stereo.updateUniformByFormat( format, this.material.uniforms );

        this.material.uniforms[ 'tEquirect' ].value = texture;

        ImagePanorama.prototype.onLoad.call( this, texture );

    },

    /**
     * Update Texture for Stereo Left Eye
     * @memberOf StereoImagePanorama
     * @instance
     */
    updateTextureToLeft: function() {

        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

    },

    /**
     * Update Texture for Stereo Right Eye
     * @memberOf StereoImagePanorama
     * @instance
     */
    updateTextureToRight: function() {

        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

    },

    /**
     * Dispose
     * @memberOf StereoImagePanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tEquirect;

        if ( value instanceof THREE.Texture ) {

            value.dispose();

        }

        ImagePanorama.prototype.dispose.call( this );

    }

} );

export { StereoImagePanorama };