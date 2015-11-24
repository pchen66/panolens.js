(function(){
	
	/**
	 * Image-based panorama
	 * @constructor
	 * @param {string} imageType - Image type for panorama ( currently only support 'equirectangular')
	 * @param {string} src - Image url
	 */
	PANOLENS.ImagePanorama = function ( imageType, src ) {

		PANOLENS.Panorama.call( this );

		this.src = src;
		this.imageType = imageType;

	}

	PANOLENS.ImagePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.ImagePanorama.prototype.constructor = PANOLENS.ImagePanorama;

	PANOLENS.ImagePanorama.prototype.load = function ( src ) {

		src = src || this.src;

		if ( !src ) { 

			console.warn( 'Image source undefined' );

			return; 
		}

		var textureLoader = new THREE.TextureLoader();

		textureLoader.load( src, this.onLoad.bind( this ), this.onProgress.bind( this ), this.onError.bind( this ) );

	};

	PANOLENS.ImagePanorama.prototype.onLoad = function ( texture ) {

		switch ( this.imageType ) {

			case 'equirectangular':

				texture.minFilter = texture.maxFilter = THREE.LinearFilter;

				break;

		}

		texture.needsUpdate = true;

		this.updatePanoObjectTexture( texture );

		PANOLENS.Panorama.prototype.onLoad.call( this );
		
	};

	PANOLENS.ImagePanorama.prototype.reset = function () {

		PANOLENS.Panorama.prototype.reset.call( this );

	};

})();