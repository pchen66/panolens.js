import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Equirectangular based image panorama
 * @constructor
 * @param {string} image - Image url or HTMLImageElement
 */
function ImagePanorama ( image ) {

    Panorama.call( this );

    this.src = image;
    this.type = 'image_panorama';

}

ImagePanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: ImagePanorama,

    /**
     * Load image asset
     * @param  {*} src - Url or image element
     * @memberOf ImagePanorama
     * @instance
     */
    load: function ( src ) {

        Panorama.prototype.load.call( this, false );

        src = src || this.src;

        if ( !src ) { 

            console.warn( 'Image source undefined' );

            return; 

        } else if ( typeof src === 'string' ) {

            TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

        } else if ( src instanceof HTMLImageElement ) {

            this.onLoad( new THREE.Texture( src ) );

        }

    },

    /**
     * This will be called when image is loaded
     * @param  {THREE.Texture} texture - Texture to be updated
     * @memberOf ImagePanorama
     * @instance
     */
    onLoad: function ( texture ) {

        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
		
        this.updateTexture( texture );

        window.requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );

    },

    /**
     * Reset
     * @memberOf ImagePanorama
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf ImagePanorama
     * @instance
     */
    dispose: function () {

        // Release cached image
        THREE.Cache.remove( this.src );

        Panorama.prototype.dispose.call( this );

    }

} );

export { ImagePanorama };