(function(){

	/**
	 * Google streetview (tile-based) panorama
	 * 
	 * [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
	 * @constructor
	 * @param {string} panoId - Panorama id from Google Streetview 
	 */
	PANOLENS.GoogleStreetviewPanorama = function ( panoId ) {

		PANOLENS.ImagePanorama.call( this, 'equirectangular' );

		this.panoId = panoId;

		this.gsvLoader = undefined;

		this.setupGoogleMapAPI();

	}

	PANOLENS.GoogleStreetviewPanorama.prototype = Object.create( PANOLENS.ImagePanorama.prototype );

	PANOLENS.GoogleStreetviewPanorama.constructor = PANOLENS.GoogleStreetviewPanorama;

	PANOLENS.GoogleStreetviewPanorama.prototype.load = function ( panoId ) {

		panoId = ( panoId || this.panoId ) || {};

		if ( panoId ) {

			this.loadGSVLoader( panoId );

		}

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.setupGoogleMapAPI = function () {

		var script = document.createElement( 'script' );
		script.src = 'https://maps.googleapis.com/maps/api/js';
		script.onreadystatechange = this.setGSVLoader.bind( this );
    	script.onload = this.setGSVLoader.bind( this );

		document.getElementsByTagName('head')[0].appendChild( script );

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.setGSVLoader = function () {

		this.gsvLoader = new GSVPANO.PanoLoader();

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.getGSVLoader = function () {

		return this.gsvLoader;

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.loadGSVLoader = function ( panoId ) {

		this.gsvLoader.onProgress = this.onProgress.bind( this );

		this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );

		this.gsvLoader.setZoom( this.getZoomLevel() );

		this.gsvLoader.load( panoId );
	};

	PANOLENS.GoogleStreetviewPanorama.prototype.onLoad = function ( canvas ) {

		if ( !this.gsvLoader ) { return; }

		PANOLENS.ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );

	};

	PANOLENS.GoogleStreetviewPanorama.prototype.reset = function () {

		this.gsvLoader = undefined;

		PANOLENS.ImagePanorama.prototype.reset.call( this );

	};

})();