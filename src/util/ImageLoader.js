(function(){
	
	'use strict';

	/**
	 * Image loader with progress based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.ImageLoader = {};

	/**
	 * Load an image with XMLHttpRequest to provide progress checking
	 * @param  {string}   url        - An image url
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {HTMLImageElement}    - DOM image element
	 */

	PANOLENS.Utils.ImageLoader.load = function ( url, onLoad, onProgress, onError ) {

		var cached, request, arrayBufferView, blob, urlCreator, image, reference;

		// Reference key
		for ( var iconName in PANOLENS.DataImage ) {

			if ( PANOLENS.DataImage.hasOwnProperty( iconName ) 
				&& url === PANOLENS.DataImage[ iconName ] ) {

				reference = iconName;

			}

		}

		// Cached
		cached = THREE.Cache.get( reference ? reference : url );

		if ( cached !== undefined ) {

			if ( onLoad ) {

				setTimeout( function () {

					if ( onProgress ) {

						onProgress( { loaded: 1, total: 1 } );

					} 
					
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

		function onImageLoaded () {

			urlCreator.revokeObjectURL( image.src );
			onLoad && onLoad( image );

		}

		if ( url.indexOf( 'data:' ) === 0 ) {

			image.addEventListener( 'load', onImageLoaded, false );
			image.src = url;
			return image;
		}

		image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';

		request = new XMLHttpRequest();
		request.open( 'GET', url, true );
		request.responseType = 'arraybuffer';
		request.onprogress = function ( event ) {

		    if ( event.lengthComputable ) {

		      onProgress && onProgress( { loaded: event.loaded, total: event.total } );

		    }

		};
		request.onloadend = function( event ) {

		    arrayBufferView = new Uint8Array( this.response );
		    blob = new Blob( [ arrayBufferView ] );
		    
		    image.addEventListener( 'load', onImageLoaded, false );
			image.src = urlCreator.createObjectURL( blob );

		};

		request.send(null);

	};

	// Enable cache
	THREE.Cache.enabled = true;

})();