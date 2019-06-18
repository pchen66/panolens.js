import { STEREOFORMAT } from '../Constants';
import { VideoPanorama } from './VideoPanorama';
import * as THREE from 'three';
import { Stereo } from '../auxiliary/Stereo';

/**
 * @classdesc Stereo Image Panorama
 * @constructor
 * @param {string} src - image source
 * @param {object} options - { @see VideoPanorama }
 * @param {number} [stereo=new Stereo()] - stereo mixin
 */
function StereoVideoPanorama ( src, options = {}, stereo = new Stereo() ){

    VideoPanorama.call( this, src, options );

    this.stereo = stereo;
    this.type = 'stereo_video_panorama';

}

StereoVideoPanorama.prototype = Object.assign( Object.create( VideoPanorama.prototype ), {

    constructor: StereoVideoPanorama,

    /**
     * This will be called when video texture is ready
     * @param  {THREE.VideoTexture} texture - Video texture
     * @memberOf StereoVideoPanorama
     * @instance
     */
    onLoad: function ( texture ) {

        const { videoWidth, videoHeight } = texture.image;
        let format = null;

        if ( videoWidth / videoHeight === 4 ) { 
            
            format = STEREOFORMAT.SBS;
        
        } else { 

            format = STEREOFORMAT.TAB;
        
        }

        this.stereo.updateUniformByFormat( format, this.material.uniforms );

        this.material.uniforms[ 'tEquirect' ].value = texture;

        VideoPanorama.prototype.onLoad.call( this );

    },

    /**
     * Update Texture for Stereo Left Eye
     * @memberOf StereoVideoPanorama
     * @instance
     */
    updateTextureToLeft: function() {

        this.stereo.updateTextureToLeft( this.material.uniforms.offset.value );

    },

    /**
     * Update Texture for Stereo Right Eye
     * @memberOf StereoVideoPanorama
     * @instance
     */
    updateTextureToRight: function() {

        this.stereo.updateTextureToRight( this.material.uniforms.offset.value );

    },

    /**
     * Dispose
     * @memberOf StereoVideoPanorama
     * @instance
     */
    dispose: function () {	

        const { value } = this.material.uniforms.tEquirect;

        if ( value instanceof THREE.Texture ) {

            value.dispose();

        }

        VideoPanorama.prototype.dispose.call( this );

    }

} );

export { StereoVideoPanorama };