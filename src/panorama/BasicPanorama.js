(function(){

	'use strict';

	/**
	 * Basic panorama with 6 faces tile images
	 * @constructor
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.BasicPanorama = function ( edgeLength ) {
		
		var tile = PANOLENS.DataImage.WhiteTile;

		PANOLENS.CubePanorama.call( this, [ tile, tile, tile, tile, tile, tile ], edgeLength );

	}

	PANOLENS.BasicPanorama.prototype = Object.create( PANOLENS.CubePanorama.prototype );

	PANOLENS.BasicPanorama.prototype.constructor = PANOLENS.BasicPanorama;

})();