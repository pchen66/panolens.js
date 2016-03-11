(function(){
	
	'use strict';

	/**
	 * Image loader with progress based on https://github.com/mrdoob/three.js/blob/master/src/loaders/ImageLoader.js
	 * @type {object}
	 */
	PANOLENS.Utils.ImageLoader = {};

	PANOLENS.Utils.ImageLoader.checkDataURL = function ( url ) {
		return !!url.match( /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i );
	};

	PANOLENS.Utils.ImageLoader.load = function ( url, onLoad, onProgress, onError ) {

		var cached, request, arrayBufferView, blob, urlCreator, image;
		
		// Cached
		cached = THREE.Cache.get( url );

		if ( cached !== undefined ) {

			if ( onLoad ) {

				setTimeout( function () {

					onLoad( cached );

				}, 0 );

			}

			return cached;

		}
		
		// Construct a new XMLHttpRequest
		urlCreator = window.URL || window.webkitURL;
		image = document.createElement( 'img' );
		
		// Add to cache
		THREE.Cache.add( url, image );

		function onImageLoaded () {

			onLoad && onLoad( image );

		}

		if ( this.checkDataURL( url ) ) {

			image.addEventListener( 'load', onImageLoaded, false );
			image.src = url;
			return image;
		}

		image.crossOrigin = this.crossOrigin !== undefined ? this.crossOrigin : '';

		request = new XMLHttpRequest();
		request.responseType = 'arraybuffer';
		request.open( 'GET', url, true );
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