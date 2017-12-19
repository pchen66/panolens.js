(function(){
	
	'use strict';

	/**
	 * Texture loader based on {@link https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js}
	 * @memberOf PANOLENS.Utils
	 * @namespace
	 */
	PANOLENS.Utils.TextureLoader = {};

	/**
	 * Load image texture
	 * @param  {string}   url        - An image url
	 * @param  {function} onLoad     - On load callback
	 * @param  {function} onProgress - In progress callback
	 * @param  {function} onError    - On error callback
	 * @return {THREE.Texture}   	 - Image texture
	 */
	PANOLENS.Utils.TextureLoader.load = function ( url, onLoad, onProgress, onError ) {

		var texture = new THREE.Texture(); 

		PANOLENS.Utils.ImageLoader.load( url, function ( image ) {

			texture.image = image;

			// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
			var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

			texture.format = isJPEG ? THREE.RGBFormat : THREE.RGBAFormat;
			texture.needsUpdate = true;

			onLoad && onLoad( texture );

		}, onProgress, onError );

		return texture;

	};

})();