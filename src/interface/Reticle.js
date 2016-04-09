(function(){
	
	PANOLENS.Reticle = function ( color, url ) {

		var map, material;

		color = color || 0xffffff;
		url = url || PANOLENS.DataImage.Reticle;

		map = PANOLENS.Utils.TextureLoader.load( url );
		material = new THREE.SpriteMaterial( { map: map, color: color } );

		THREE.Sprite.call( this, material );

		this.visible = false;		

	}

	PANOLENS.Reticle.prototype = Object.create( THREE.Sprite.prototype );

	PANOLENS.Reticle.prototype.constructor = PANOLENS.Reticle;

	PANOLENS.Reticle.prototype.show = function () {

		this.visible = true;

	};

	PANOLENS.Reticle.prototype.hide = function () {

		this.visible = false;

	};

})();