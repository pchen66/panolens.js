(function(){
	
	/**
	 * Reticle 3D Sprite
	 * @param {THREE.Color} [color=0xfffff] - Color of the reticle sprite
	 * @param {string} [url=PANOLENS.DataImage.Reticle] - Image asset url
	 */
	PANOLENS.Reticle = function ( color, url ) {

		var map, material;

		color = color || 0xffffff;
		url = url || PANOLENS.DataImage.Reticle;

		map = PANOLENS.Utils.TextureLoader.load( url );
		material = new THREE.SpriteMaterial( { map: map, color: color, depthTest: false } );

		THREE.Sprite.call( this, material );

		this.visible = false;
		this.renderOrder = 10;

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

})();