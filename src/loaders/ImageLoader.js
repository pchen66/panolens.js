import { DataImage } from '../DataImage.js';
import * as THREE from 'three';

/**
 * @module ImageLoader
 * @description Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
 */
const ImageLoader = {

    /**
     * Load image
     * @example PANOLENS.ImageLoader.load( IMAGE_URL )
     * @method load
     * @param  {string}   url        - An image url
     * @param  {function} onLoad     - On load callback
     * @param  {function} onProgress - In progress callback
     * @param  {function} onError    - On error callback
     */
    load: function ( url, onLoad = () => {}, onProgress = () => {}, onError = () => {} ) {

        // Enable cache
        THREE.Cache.enabled = true;

        let cached, request, arrayBufferView, blob, urlCreator, image, reference;
	
        // Reference key
        for ( let iconName in DataImage ) {
	
            if ( DataImage.hasOwnProperty( iconName ) && url === DataImage[ iconName ] ) {
	
                reference = iconName;
	
            }
	
        }
	
        // Cached
        cached = THREE.Cache.get( reference ? reference : url );
	
        if ( cached !== undefined ) {
	
            if ( onLoad ) {
	
                setTimeout( function () {
	
                    onProgress( { loaded: 1, total: 1 } );
                    onLoad( cached );
	
                }, 0 );
	
            }
	
            return cached;
	
        }
		
        // Construct a new XMLHttpRequest
        urlCreator = window.URL || window.webkitURL;
        image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
	
        // Add to cache
        THREE.Cache.add( reference ? reference : url, image );
	
        const onImageLoaded = () => {
	
            urlCreator.revokeObjectURL( image.src );
            onLoad( image );
	
        };

        if ( url.indexOf( 'data:' ) === 0 ) {

            image.addEventListener( 'load', onImageLoaded, false );
            image.src = url;
            return image;
        }
	
        image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';
	
        request = new window.XMLHttpRequest();
        request.open( 'GET', url, true );
        request.responseType = 'arraybuffer';
        request.addEventListener( 'error', onError );
        request.addEventListener( 'progress', event => {

            if  ( !event ) return;

            const { loaded, total, lengthComputable } = event;
            
            if ( lengthComputable ) {
	
                onProgress( { loaded, total } );
	
            }
	
        } );
        
        request.addEventListener( 'loadend', event => {

            if  ( !event ) return;
            const { currentTarget: { response } } = event;

            arrayBufferView = new Uint8Array( response );
            blob = new window.Blob( [ arrayBufferView ] );
				
            image.addEventListener( 'load', onImageLoaded, false );
            image.src = urlCreator.createObjectURL( blob );
	
        } );
	
        request.send(null);
	
    }

};

export { ImageLoader };