(function(){
	
	/**
	 * Reticle 3D Sprite
	 * @constructor
	 * @param {THREE.Color} [color=0xfffff] - Color of the reticle sprite
	 * @param {boolean} [autoSelect=true] - Auto selection
	 * @param {string} [idleImageUrl=PANOLENS.DataImage.ReticleIdle] - Image asset url
	 * @param {string} [dwellImageUrl=PANOLENS.DataImage.ReticleDwell] - Image asset url
	 * @param {number} [dwellTime=1500] - Duration for dwelling sequence to complete
	 * @param {number} [dwellSpriteAmount=45] - Number of dwelling sprite sequence
	 */
	PANOLENS.Reticle = function ( color, autoSelect, idleImageUrl, dwellImageUrl, dwellTime, dwellSpriteAmount ) {

		color = color || 0xffffff;

		this.autoSelect = autoSelect != undefined ? autoSelect : true;

		this.dwellTime = dwellTime || 1500;
		this.dwellSpriteAmount = dwellSpriteAmount || 45;
		this.dwellInterval = this.dwellTime / this.dwellSpriteAmount;

		this.IDLE = 0;
		this.DWELLING = 1;
		this.status;

		this.scaleIdle = new THREE.Vector3( 0.2, 0.2, 1 );
		this.scaleDwell = new THREE.Vector3( 1, 0.8, 1 );

		this.textureLoaded = false;
		this.idleImageUrl = idleImageUrl || PANOLENS.DataImage.ReticleIdle;
		this.dwellImageUrl = dwellImageUrl || PANOLENS.DataImage.ReticleDwell;
		this.idleTexture = new THREE.Texture();
		this.dwellTexture = new THREE.Texture();

		THREE.Sprite.call( this, new THREE.SpriteMaterial( { color: color, depthTest: false } ) );

		this.currentTile = 0;
		this.startTime = 0;

		this.visible = false;
		this.renderOrder = 10;
		this.timerId;

		// initial update
		this.updateStatus( this.IDLE );

	};

	PANOLENS.Reticle.prototype = Object.create( THREE.Sprite.prototype );

	PANOLENS.Reticle.prototype.constructor = PANOLENS.Reticle;

	/**
	 * Make reticle visible
	 */
	PANOLENS.Reticle.prototype.show = function () {

		this.visible = true;

	};

	/**
	 * Make reticle invisible
	 */
	PANOLENS.Reticle.prototype.hide = function () {

		this.visible = false;

	};

	/**
	 * Load reticle textures
	 */
	PANOLENS.Reticle.prototype.loadTextures = function () {

		this.idleTexture = PANOLENS.Utils.TextureLoader.load( this.idleImageUrl );
		this.dwellTexture = PANOLENS.Utils.TextureLoader.load( this.dwellImageUrl );

		this.material.map = this.idleTexture;
		this.setupDwellSprite( this.dwellTexture );
		this.textureLoaded = true;

	};

	/**
	 * Start reticle timer selection
	 * @param  {function} completeCallback - Callback after dwell completes
	 */
	PANOLENS.Reticle.prototype.select = function ( completeCallback ) {

		if ( performance.now() - this.startTime >= this.dwellTime ) {

			this.completeDwelling();
			completeCallback();

		} else if ( this.autoSelect ){

			this.updateDwelling( performance.now() );
			this.timerId = window.requestAnimationFrame( this.select.bind( this, completeCallback ) );

		}

	};

	/**
	 * Clear and reset reticle timer
	 */
	PANOLENS.Reticle.prototype.clearTimer = function () {

		window.cancelAnimationFrame( this.timerId );
		this.timerId = null;

	};

	/**
	 * Setup dwell sprite animation
	 */
	PANOLENS.Reticle.prototype.setupDwellSprite = function ( texture ) {

		texture.wrapS = THREE.RepeatWrapping;
		texture.repeat.set( 1 / this.dwellSpriteAmount, 1 );

	}

	/**
	 * Update reticle status
	 * @param {number} status - Reticle status
	 */
	PANOLENS.Reticle.prototype.updateStatus = function ( status ) {

		this.status = status;

		if ( status === this.IDLE ) {
			this.scale.copy( this.scaleIdle );
			this.material.map = this.idleTexture;
		} else if ( status === this.DWELLING ) {
			this.scale.copy( this.scaleDwell );
			this.material.map = this.dwellTexture;
		}

		this.currentTile = 0;
		this.material.map.offset.x = 0;

	};

	/**
	 * Start dwelling sequence
	 */
	PANOLENS.Reticle.prototype.startDwelling = function ( completeCallback ) {

		if ( !this.autoSelect ) {

			return;

		}

		this.startTime = performance.now();
		this.updateStatus( this.DWELLING );
		this.select( completeCallback );

	};

	/**
	 * Update dwelling sequence
	 * @param  {number} time - Timestamp for elasped time
	 */
	PANOLENS.Reticle.prototype.updateDwelling = function ( time ) {

		var elasped = time - this.startTime;

		if ( this.currentTile <= this.dwellSpriteAmount ) {
			this.currentTile = Math.floor( elasped / this.dwellTime * this.dwellSpriteAmount );
			this.material.map.offset.x = this.currentTile / this.dwellSpriteAmount;
		} else {
			this.updateStatus( this.IDLE );
		}

	};

	/**
	 * Cancel dwelling
	 */
	PANOLENS.Reticle.prototype.cancelDwelling = function () {
		this.clearTimer();
		this.updateStatus( this.IDLE );

	};

	/**
	 * Complete dwelling
	 */
	PANOLENS.Reticle.prototype.completeDwelling = function () {
		this.clearTimer();	
		this.updateStatus( this.IDLE );
	};

})();