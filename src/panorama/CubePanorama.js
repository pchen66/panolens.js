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

		geometry = new THREE.BoxBufferGeometry( edgeLength, edgeLength, edgeLength );
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

	PANOLENS.CubePanorama.prototype.dispose = function () {	

		this.images.forEach( function( image ) {

			THREE.Cache.remove( image );

		} );

		this.material.uniforms[ 'tCube' ] && this.material.uniforms[ 'tCube' ].value.dispose();

		PANOLENS.Panorama.prototype.dispose.call( this );

	};

	PANOLENS.CubePanorama.prototype.setupTransitions = function () {

		this.fadeInAnimation = new TWEEN.Tween( this.material.uniforms.opacity )
		.easing( TWEEN.Easing.Quartic.Out )
		.onStart( function () {

			this.visible = true;
			this.material.visible = true;

			/**
			 * Enter panorama fade in start event
			 * @event PANOLENS.Panorama#enter-fade-start
			 * @type {object}
			 */
			this.dispatchEvent( { type: 'enter-fade-start' } );

		}.bind( this ) );

		this.fadeOutAnimation = new TWEEN.Tween( this.material.uniforms.opacity )
		.easing( TWEEN.Easing.Quartic.Out )
		.onComplete( function () {

			this.visible = false;
			this.material.visible = true;

			/**
			 * Leave panorama complete event
			 * @event PANOLENS.Panorama#leave-complete
			 * @type {object}
			 */
			this.dispatchEvent( { type: 'leave-complete' } );

		}.bind( this ) );

		this.enterTransition = new TWEEN.Tween( this )
		.easing( TWEEN.Easing.Quartic.Out )
		.onComplete( function () {

			/**
			 * Enter panorama and animation complete event
			 * @event PANOLENS.Panorama#enter-animation-complete
			 * @type {object}
			 */
			this.dispatchEvent( { type: 'enter-animation-complete' } );

		}.bind ( this ) )
		.start();

		this.leaveTransition = new TWEEN.Tween( this )
		.easing( TWEEN.Easing.Quartic.Out );

	};

	/**
	 * Start fading in animation
	 * @fires PANOLENS.Panorama#enter-fade-complete
	 */
	PANOLENS.CubePanorama.prototype.fadeIn = function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeOutAnimation.stop();
		this.fadeInAnimation
		.to( { value: 1 }, duration )
		.onComplete( function () {

			this.toggleInfospotVisibility( true, duration / 2 );

			/**
			 * Enter panorama fade complete event
			 * @event PANOLENS.Panorama#enter-fade-complete
			 * @type {object}
			 */
			this.dispatchEvent( { type: 'enter-fade-complete' } );

		}.bind( this ) )
		.start();

	};

	/**
	 * Start fading out animation
	 */
	PANOLENS.CubePanorama.prototype.fadeOut = function ( duration ) {

		duration = duration >= 0 ? duration : this.animationDuration;

		this.fadeInAnimation.stop();
		this.fadeOutAnimation.to( { value: 0 }, duration ).start();

	};

})();