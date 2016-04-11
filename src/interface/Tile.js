( function () {
	
	/**
	 * Creates a tile with bent capability
	 * @constructor
	 * @param {number}  [width=10]                      				- Width along the X axis
	 * @param {number}  [height=5]                      				- Height along the Y axis
	 * @param {number}  [widthSegments=20]              				- Width segments
	 * @param {number}  [heightSegments=20]             				- Height segments
	 * @param {THREE.Vector3} [forceDirection=THREE.Vector3( 0, 0, 1 )] - Force direction
	 * @param {THREE.Vector3} [forceAxis=THREE.Vector3( 0, 1, 0 )] 		- Along this axis
	 * @param {number} [forceAngle=Math.PI/12] 							- Angle to bend in radians
	 */
	PANOLENS.Tile = function ( width, height, widthSegments, heightSegments, forceDirection, forceAxis, forceAngle ) {

		var scope = this;

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			forceDirection: forceDirection,
			forceAxis: forceAxis,
			forceAngle: forceAngle
		};

		width = width || 10;
		height = height || 5;
		widthSegments = widthSegments || 1;
		heightSegments = heightSegments || 1;
		forceDirection = forceDirection || new THREE.Vector3( 0, 0, 1 );
		forceAxis = forceAxis || new THREE.Vector3( 0, 1, 0 );
		forceAngle = forceAngle !== undefined ? forceAngle : 0;

		THREE.Mesh.call( this, 
			new THREE.PlaneGeometry( width, height, widthSegments, heightSegments ),
			new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true } )
		);

		this.bendModifier = new THREE.BendModifier();

		this.entity = undefined;

		this.animationDuration = 500;
		this.animationFadeOut = undefined;
		this.animationFadeIn = undefined;
		this.animationTranslation = undefined;
		this.tweens = {};

		if ( forceAngle !== 0 ) {

			this.bend( forceDirection, forceAxis, forceAngle );

		}
		
		this.originalGeometry = this.geometry.clone();
	}

	PANOLENS.Tile.prototype = Object.create( THREE.Mesh.prototype );

	PANOLENS.Tile.prototype.constructor = PANOLENS.Tile;

	PANOLENS.Tile.prototype.clone = function (){

		var parameters = this.parameters, tile;

		tile = new PANOLENS.Tile(
			parameters.width,
			parameters.height,
			parameters.widthSegments,
			parameters.heightSegments,
			parameters.forceDirection,
			parameters.forceAxis,
			parameters.forceAngle
		);

		tile.setEntity( this.entity );
		tile.material = this.material.clone();

		return tile;

	};

	/**
	 * Bend panel with direction, axis, and angle
	 * @param  {THREE.Vector3} direction - Force direction
	 * @param  {THREE.Vector3} axis - Along this axis
	 * @param  {number} angle - Angle to bend in radians
	 */
	PANOLENS.Tile.prototype.bend = function ( direction, axis, angle ) {

		this.bendModifier.set( direction, axis, angle ).modify( this.geometry );

	};

	/**
	 * Restore geometry back to initial state 
	 */
	PANOLENS.Tile.prototype.unbend = function () {

		var geometry = this.geometry;

		this.geometry = this.originalGeometry;
		this.originalGeometry = this.geometry.clone();

		geometry.dispose();
		geometry = null;

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
	PANOLENS.Tile.prototype.tween = function ( name, object, toState, duration, easing, delay, onStart, onUpdate, onComplete ) {

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
     * Short-hand for displaying a single ripple effect
     * by duplicating itself and fadeout
     * @param  {number} scale    - The duplicated self fadeout scale
     * @param  {number} duration - Effect duration
     * @param  {TWEEN.Easing} easing   - Easing function
     */
    PANOLENS.Tile.prototype.ripple = function ( scale, duration, easing ) {

    	scale = scale || 2;
    	duration = duration || 200;
    	easing = easing || TWEEN.Easing.Cubic.Out;

    	var scope = this, ripple = this.clone();

        new TWEEN.Tween( ripple.scale )
        .to({x: scale, y: scale}, duration )
        .easing( easing )
        .start();

        new TWEEN.Tween( ripple.material )
        .to({opacity: 0}, duration )
        .easing( easing )
        .onComplete(function(){
            scope.remove( ripple );
            ripple.geometry.dispose();
            ripple.material.dispose();
        })
        .start();

        this.add( ripple );

    };

    /**
	 * Set entity if multiple objects are considered as one entity
	 * @param {object} entity - Entity represents whole group structure
	 */
	PANOLENS.Tile.prototype.setEntity = function ( entity ) {

		this.entity = entity;

	};

} )();