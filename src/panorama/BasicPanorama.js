(function(){

	'use strict';

	/**
	 * Basic panorama with 6 faces tile images
	 * @constructor
	 */
	PANOLENS.BasicPanorama = function () {
		
		var tile = PANOLENS.DataImage.WhiteTile;

		PANOLENS.CubePanorama.call( this, [ tile, tile, tile, tile, tile, tile ] );

	}

	PANOLENS.BasicPanorama.prototype = Object.create( PANOLENS.CubePanorama.prototype );

	PANOLENS.BasicPanorama.prototype.constructor = PANOLENS.BasicPanorama;

})();