(function(){
	
	'use strict';

	var sharedFont, sharedTexture;
	var pendingQueue = [];

	/**
	 * Sprite text based on {@link https://github.com/Jam3/three-bmfont-text}
	 * @constructor
	 * @param {string} text     - Text to be displayed
	 * @param {number} maxWidth	- Max width
	 * @param {number} color    - Color in hexadecimal
	 * @param {number} opacity  - Text opacity
	 * @param {object} options  - Options to create text geometry
	 */
	PANOLENS.SpriteText = function ( text, maxWidth, color, opacity, options ) {

		THREE.Object3D.call( this );

		this.text = text || '';
		this.maxWidth = maxWidth || 2000;
		this.color = color || 0xffffff;
		this.opacity = opacity !== undefined ? opacity : 1;
		this.options = options || {};

		this.animationDuration = 500;
		this.animationFadeOut = undefined;
		this.animationFadeIn = undefined;
		this.tweens = {};

		this.addText( text );

	}

	PANOLENS.SpriteText.prototype = Object.create( THREE.Object3D.prototype );

	PANOLENS.SpriteText.prototype.constructor = PANOLENS.SpriteText;

	// Reference function will be overwritten by Bmfont.js
	PANOLENS.SpriteText.prototype.generateTextGeometry = function () {};
	PANOLENS.SpriteText.prototype.generateSDFShader = function () {};

	/**
	 * Set BMFont
	 * @param {Function} callback - Callback after font is loaded
	 * @param {object}   font     - The font to be loaded
	 * @param {THREE.Texture}   texture  - Font texture
	 */
	PANOLENS.SpriteText.prototype.setBMFont = function ( callback, font, texture ) {

		texture.needsUpdate = true;
	  	texture.minFilter = THREE.LinearMipMapLinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.generateMipmaps = true;
		texture.anisotropy = 8;

		sharedFont = font;
		sharedTexture = texture;

		for ( var i = pendingQueue.length - 1; i >= 0; i-- ) {
			pendingQueue[ i ].target.addText( pendingQueue[ i ].text );
		}

		while ( pendingQueue.length > 0 ) {
			pendingQueue.pop();
		}

		callback && callback();

	};

	/**
	 * Add text mesh
	 * @param {string} text - Text to be displayed
	 */
	PANOLENS.SpriteText.prototype.addText = function ( text ) {

		if ( !sharedFont || !sharedTexture ) {
			pendingQueue.push( { target: this, text: text } );
			return;
		}

		var textAnchor = new THREE.Object3D();

		this.options.text = text;
		this.options.font = sharedFont;
		this.options.width = this.maxWidth;

		var geometry = this.generateTextGeometry( this.options );
		geometry.computeBoundingBox();
		geometry.computeBoundingSphere();

		var material = new THREE.RawShaderMaterial(this.generateSDFShader({
		    map: sharedTexture,
		    side: THREE.DoubleSide,
		    transparent: true,
		    color: this.color,
		    opacity: this.opacity
		}));

		var layout = geometry.layout;
		var textMesh = new THREE.Mesh( geometry, material );

		textMesh.entity = this;
		textMesh.position.x = -layout.width / 2;
		textMesh.position.y = layout.height * 1.035;

		textAnchor.scale.x = textAnchor.scale.y = -0.05;
		textAnchor.add( textMesh );

		this.mesh = textMesh;
		this.add( textAnchor );

	};

	/**
	 * Update text geometry
	 * @param  {object} options - Geometry options based on
	 *  https://github.com/Jam3/three-bmfont-text#geometry--createtextopt
	 */
	PANOLENS.SpriteText.prototype.update = function ( options ) {

		var mesh;

		options = options || {};

		mesh = this.mesh;

		mesh.geometry.update( options );
		mesh.position.x = -mesh.geometry.layout.width / 2;
		mesh.position.y = mesh.geometry.layout.height * 1.035;

	};

	/**
	 * Create a tween object for animation
	 * based on - {@link https://github.com/tweenjs/tween.js}
	 * @param  {string} name       - Name of the tween animation
	 * @param  {object} object     - Object to be tweened
	 * @param  {object} toState    - Final state of the object's properties
	 * @param  {number} duration   - Tweening duration
	 * @param  {TWEEN.Easing} easing     - Easing function
	 * @param  {number} delay      - Animation delay time
	 * @param  {Function} onStart    - On start function
	 * @param  {Function} onUpdate   - On update function
	 * @param  {Function} onComplete - On complete function
	 * @return {TWEEN.Tween}         - Tween object
	 */
	PANOLENS.SpriteText.prototype.tween = function ( name, object, toState, duration, easing, delay, onStart, onUpdate, onComplete ) {

		object = object || this;
		toState = toState || {};
		duration = duration || this.animationDuration;
		easing = easing || TWEEN.Easing.Exponential.Out;
		delay = delay !== undefined ? delay : 0;
		onStart = onStart ? onStart : null;
		onUpdate = onUpdate ? onUpdate : null;
		onComplete = onComplete ? onComplete : null;

		if ( !this.tweens[name] ) {
			this.tweens[name] = new TWEEN.Tween( object )
				.to( toState, duration )
	        	.easing( easing )
	        	.delay( delay )
	        	.onStart( onStart )
	        	.onUpdate( onUpdate )
	        	.onComplete( onComplete );
		}

		return this.tweens[name];

	};

	/**
	 * Get geometry layout
	 * @return {object} Text geometry layout 
	 */
	PANOLENS.SpriteText.prototype.getLayout = function () {

		return this.mesh && this.mesh.geometry && this.mesh.geometry.layout || {};

	};

	/**
	 * Set entity if multiple objects are considered as one entity
	 * @param {object} entity - Entity represents whole group structure
	 */
	PANOLENS.SpriteText.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

})();