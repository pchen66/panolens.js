(function(){
	
	/**
	 * Cubemap-based panorama
	 * @constructor
	 * @param {array} urls - An array of cubetexture containing six image urls
	 * @param {number} [edgeLength=200] - The length of cube's edge
	 */
	PANOLENS.CubePanorama = function ( urls, edgeLength ){

		edgeLength = edgeLength || 200;

		var materials = [], material;

		material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0 } );
		
		for ( var i = 0; i < 6; i++ ) {
			materials.push( material );
		}

		PANOLENS.Panorama.call( this, 
			new THREE.BoxGeometry( edgeLength, edgeLength, edgeLength ), 
			new THREE.MeshFaceMaterial( materials )
		);

		this.orbitRadius = edgeLength / 2;

		this.urls = urls || [];

	}

	PANOLENS.CubePanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.CubePanorama.prototype.constructor = PANOLENS.CubePanorama;

	PANOLENS.CubePanorama.prototype.load = function ( urls ) {

		urls = urls || this.urls;

		var materials = urls,
			loadingManager = new THREE.LoadingManager();

		loadingManager.onLoad = this.onLoad.bind( this, materials );
		loadingManager.onProgress = this.onProgress.bind( this );
		loadingManager.onError = this.onError.bind( this );

		urls.map( function ( url ) {

			var textureLoader = new THREE.TextureLoader( loadingManager );
			textureLoader.load( url, onEachTextureLoad.bind( url ) );

		} );

		// Bind url string to this variable
		function onEachTextureLoad ( texture ) {

			var material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0, transparent: true } );

			materials.splice( materials.indexOf( this.toString() ), 1, material );

		}

	};

	PANOLENS.CubePanorama.prototype.onLoad = function ( materials ) {

		this.material.materials = materials;
		PANOLENS.Panorama.prototype.onLoad.call( this );

	};

	PANOLENS.CubePanorama.prototype.onProgress = function ( item, loaded, total ) {

		PANOLENS.Panorama.prototype.onProgress.call( this, { loaded: loaded, total: total } );

	};

	PANOLENS.CubePanorama.prototype.fadeIn = function () {

		for ( var i = 0; i < this.material.materials.length; i++ ) {

			new TWEEN.Tween( this.material.materials[ i ] )
			.to( { opacity: 1 }, this.animationDuration )
			.easing( TWEEN.Easing.Quartic.Out )
			.start();

		}

	};

	PANOLENS.CubePanorama.prototype.fadeOut = function () {

		for ( var i = 0; i < this.material.materials.length; i++ ) {

			new TWEEN.Tween( this.material.materials[ i ] )
			.to( { opacity: 0 }, this.animationDuration )
			.easing( TWEEN.Easing.Quartic.Out )
			.start();

		}

	}

})();