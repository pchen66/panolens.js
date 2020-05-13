import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Equirectangular based image panorama
 * @constructor
 * @param {string} image - Image url or HTMLImageElement
 */
function ImagePartialPanorama ( image, _geometry, _material, imageWidth, imageHeight ) {

    const verticalOffset = -0.1;
    const heightProportionDenominator = Math.PI;

    if (imageWidth && imageHeight) {
        heightProportionDenominator = imageWidth/imageHeight; // .3612328
    }

    const startY = (Math.PI*heightProportionDenominator)+verticalOffset;
    const yLength = (Math.PI*heightProportionDenominator);
    const startX = Math.PI;
    const xLength = Math.PI;

    const radius = 5000;
    const geometry = _geometry || new THREE.SphereBufferGeometry( radius, 60, 40, startX, xLength, startY, yLength );
    const material = _material || new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

    Panorama.call( this, geometry, material );

    this.src = image;
    this.radius = radius;

}

ImagePartialPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: ImagePartialPanorama,

    /**
     * Load image asset
     * @param  {*} src - Url or image element
     * @memberOf ImagePartialPanorama
     * @instance
     */
    load: function ( src ) {

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
     * @memberOf ImagePartialPanorama
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
     * @memberOf ImagePartialPanorama
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf ImagePartialPanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        // Release cached image
        THREE.Cache.remove( this.src );

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

export { ImagePartialPanorama };