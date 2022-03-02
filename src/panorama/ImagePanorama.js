import { Panorama } from './Panorama';
import { TextureLoader } from '../loaders/TextureLoader';
import * as THREE from 'three';

/**
 * @classdesc Equirectangular based image panorama
 * @constructor
 * @param {string} image - Image url or HTMLImageElement
 */
class ImagePanorama extends Panorama {
    constructor( image, _geometry, _material ) {
        const radius = 5000;
        const geometry = _geometry || new THREE.SphereBufferGeometry( radius, 60, 40 );
        const material = _material || new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );
        super(geometry, material);

        this.src = image;
        this.radius = radius;
    }

    load ( src ) {

        src = src || this.src;

        if ( !src ) { 

            console.warn( 'Image source undefined' );

            return; 

        } else if ( typeof src === 'string' ) {

            TextureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

        } else if ( src instanceof HTMLImageElement ) {

            this.onLoad( new THREE.Texture( src ) );

        }

    }

    /**
     * This will be called when image is loaded
     * @param  {THREE.Texture} texture - Texture to be updated
     * @memberOf ImagePanorama
     * @instance
     */
    onLoad( texture ) {

        texture.minFilter = texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        this.updateTexture( texture );

        window.requestAnimationFrame( Panorama.prototype.onLoad.bind( this ) );

    }

    /**
     * Reset
     * @memberOf ImagePanorama
     * @instance
     */
    reset() {

        Panorama.prototype.reset.call( this );

    }

    /**
     * Dispose
     * @memberOf ImagePanorama
     * @instance
     */
    dispose() {

        const { material: { map } } = this;

        // Release cached image
        THREE.Cache.remove( this.src );

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }



}

export { ImagePanorama };