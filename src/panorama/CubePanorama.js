(function(){
	
	/**
	 * Cubemap-based panorama
	 * @constructor
	 * @param {array} images - An array of cubetexture containing six images
	 * @param {number} [edgeLength=10000] - The length of cube's edge
	 */
	PANOLENS.CubePanorama = function ( images, edgeLength ){

		var shader, material;

		edgeLength = edgeLength || 10000;

		shader = JSON.parse(JSON.stringify(THREE.ShaderLib[ "cube" ]));
		shader.uniforms[ "tCube" ].value = new THREE.CubeTextureLoader().load( images );

		material = new THREE.ShaderMaterial( {

			fragmentShader: shader.fragmentShader,
			vertexShader: shader.vertexShader,
			uniforms: shader.uniforms,
			side: THREE.BackSide

		} );

		PANOLENS.Panorama.call( this, 
			new THREE.BoxGeometry( edgeLength, edgeLength, edgeLength ), 
			material
		);

		this.orbitRadius = edgeLength / 2;

		this.images = images || [];

	}

	PANOLENS.CubePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.CubePanorama.prototype.constructor = PANOLENS.CubePanorama;

	PANOLENS.CubePanorama.prototype.onLoad = function () {
		
		PANOLENS.Panorama.prototype.onLoad.call( this );

	};

})();