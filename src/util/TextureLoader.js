(function(){
	
	'use strict';

	/**
	 * Texture loader based on https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js
	 * @type {object}
	 */
	
	PANOLENS.Utils.TextureLoader = {};

	PANOLENS.Utils.TextureLoader.load = function ( url, onLoad, onProgress, onError ) {

		var texture = new THREE.Texture(); 

		PANOLENS.Utils.ImageLoader.load( url, function ( image ) {

			texture.image = image;
			texture.needsUpdate = true;

			onLoad && onLoad( texture );

		}, onProgress, onError );

		return texture;

	};

})();