(function(){
	
	'use strict';
	
	/**
	 * Cubemap-based panorama
	 * @constructor
	 * @param {array} images - An array of cubetexture containing six images
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.CubePanorama = function ( images, edgeLength ){

		var shader, geometry, material;

		this.images = images || [];

		edgeLength = edgeLength || 10000;
		shader = JSON.parse( JSON.stringify( THREE.ShaderLib[ 'cube' ] ) );

		geometry = new THREE.BoxGeometry( edgeLength, edgeLength, edgeLength );
		material = new THREE.ShaderMaterial( {

			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			side: THREE.BackSide

		} );

		PANOLENS.Panorama.call( this, geometry, material );

	}

	PANOLENS.CubePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.CubePanorama.prototype.constructor = PANOLENS.CubePanorama;

	/**
	 * Load 6 images and bind listeners
	 */
	PANOLENS.CubePanorama.prototype.load = function () {

		PANOLENS.Utils.CubeTextureLoader.load( 	

			this.images, 

			this.onLoad.bind( this ), 
			this.onProgress.bind( this ), 
			this.onError.bind( this ) 

		);

	};

	/**
	 * This will be called when 6 textures are ready
	 * @param  {THREE.CubeTexture} texture - Cube texture
	 */
	PANOLENS.CubePanorama.prototype.onLoad = function ( texture ) {
		
		this.material.uniforms[ 'tCube' ].value = texture;

		PANOLENS.Panorama.prototype.onLoad.call( this );

	};

})();