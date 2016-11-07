( function () {

	/**
	 * Image Little Planet
	 * @constructor
	 * @param {string} source 		- URL for the image source
	 * @param {number} [size=10000] - Size of plane geometry
	 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
	 */
	PANOLENS.ImageLittlePlanet = function ( source, size, ratio ) {

		PANOLENS.LittlePlanet.call( this, 'image', source, size, ratio );

	};

	PANOLENS.ImageLittlePlanet.prototype = Object.create( PANOLENS.LittlePlanet.prototype );
	
	PANOLENS.ImageLittlePlanet.prototype.constructor = PANOLENS.ImageLittlePlanet;

	PANOLENS.ImageLittlePlanet.prototype.onLoad = function ( texture ) {

		this.updateTexture( texture );

		PANOLENS.ImagePanorama.prototype.onLoad.call( this, texture );
		PANOLENS.LittlePlanet.prototype.onLoad.call( this );

	};

	PANOLENS.ImageLittlePlanet.prototype.updateTexture = function ( texture ) {

		texture.minFilter = texture.magFilter = THREE.LinearFilter;
		
		this.material.uniforms[ "tDiffuse" ].value = texture;

	};

} )();