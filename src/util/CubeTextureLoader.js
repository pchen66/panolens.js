(function(){
	
	'use strict';

	/**
	 * Cube Texture Loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/CubeTextureLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.CubeTextureLoader = {};

	/**
	 * Load 6 images as a cube texture
	 * @param  {array}   urls        - Array with 6 image urls
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {THREE.CubeTexture}   - Cube texture
	 */
	PANOLENS.Utils.CubeTextureLoader.load = function ( urls, onLoad, onProgress, onError ) {

		var texture, loaded, progress, all, loadings;

		texture = new THREE.CubeTexture( [] );

		loaded = 0;
		progress = {};
		all = {};

		urls.map( function ( url, index ) {

			PANOLENS.Utils.ImageLoader.load( url, function ( image ) {

				texture.images[ index ] = image;

				loaded++;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					onLoad && onLoad( texture );

				}

			}, function ( event ) {

				progress[ index ] = { loaded: event.loaded, total: event.total };

				all.loaded = 0;
				all.total = 0;
				loadings = 0;

				for ( var i in progress ) {

					loadings++;
					all.loaded += progress[ i ].loaded;
					all.total += progress[ i ].total;

				}

				if ( loadings < 6 ) {

					all.total = all.total / loadings * 6;

				}

				onProgress && onProgress( all );

			}, onError );

		} );

		return texture;

	};

})();