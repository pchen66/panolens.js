(function(){
	
	'use strict';

    /**
     * Group consists of tile array
     * @constructor
     * @param {array}  tileArray         - Tile array of PANOLENS.Tile 
     * @param {number} verticalGap       - Vertical gap between each tile
     * @param {number} depthGap          - Depth gap between each tile
     * @param {number} animationDuration - Animation duration
     * @param {number} offset            - Offset index
     */
	PANOLENS.TileGroup = function ( tileArray, verticalGap, depthGap, animationDuration, offset ) {

		var scope = this, textureLoader;

		THREE.Object3D.call( this );

		this.tileArray = tileArray || [];
		this.offset = offset !== undefined ? offset : 0;
		this.v_gap = verticalGap !== undefined ? verticalGap : 6;
		this.d_gap = depthGap !== undefined ? depthGap : 2;
		this.animationDuration = animationDuration !== undefined ? animationDuration : 200;
		this.animationEasing = TWEEN.Easing.Exponential.Out;
		this.visibleDelta = 2;

		this.tileArray.map( function ( tile, index ) {

			if ( tile.image ) {

				PANOLENS.Utils.TextureLoader.load( tile.image, scope.setTexture.bind( tile ) );

			}

			tile.position.set( 0, index * -scope.v_gap, index * -scope.d_gap );
			tile.originalPosition = tile.position.clone();
			tile.setEntity( scope );
			scope.add( tile );

		} );

		this.updateVisbility();

	}

	PANOLENS.TileGroup.prototype = Object.create( THREE.Object3D.prototype );

	PANOLENS.TileGroup.prototype.constructor = PANOLENS.TileGroup;

    /**
     * Update corresponding tile textures
     * @param  {array} imageArray - Image array with index to index image update
     */
	PANOLENS.TileGroup.prototype.updateTexture = function ( imageArray ) {

		var scope = this;

		imageArray = imageArray || [];
		this.children.map( function ( child, index ) {
			if ( child instanceof PANOLENS.Tile && imageArray[index] ) {
				PANOLENS.Utils.TextureLoader.load( imageArray[index], scope.setTexture.bind( child ) );
	    		if ( child.outline ) {
	    			child.outline.material.visible = true;
	    		}
			}
		} );

	};

    /**
     * Update all tile textures and hide the remaining ones
     * @param  {array} imageArray - Image array with index to index image update
     */
	PANOLENS.TileGroup.prototype.updateAllTexture = function ( imageArray ) {

		this.updateTexture( imageArray );

		if ( imageArray.length < this.children.length ) {
			for ( var i = imageArray.length; i < this.children.length; i++ ) {
				if ( this.children[i] instanceof PANOLENS.Tile ) {
					this.children[i].material.visible = false;
					if ( this.children[i].outline ) {
						this.children[i].outline.material.visible = false;
					}
				}
			}
		}

	}

    /**
     * Set individual texture
     * @param {THREE.Texture} texture - Texture to be updated
     */
	PANOLENS.TileGroup.prototype.setTexture = function ( texture ) {

        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.material.visible = true;
        this.material.map = texture;
        this.material.needsUpdate = true;

    };

    /**
     * Update visibility
     */
    PANOLENS.TileGroup.prototype.updateVisbility = function () {

    	this.children[this.offset].visible = true;
    	new TWEEN.Tween( this.children[this.offset].material )
		.to( { opacity: 1 }, this.animationDuration )
		.easing( this.animationEasing )
		.start();
    	
    	if ( this.children[this.offset].outline ) {

    		this.children[this.offset].outline.visible = true;

    	}

    	// Backward
    	for ( var i = this.offset - 1; i >= 0 ; i-- ) {

    		if ( this.tileArray.indexOf(this.children[i]) === -1 ) { continue; }

    		if ( this.offset - i <= this.visibleDelta ) {

    			this.children[i].visible = true;
    			new TWEEN.Tween( this.children[i].material )
    			.to( { opacity: 1 / ( this.offset - i ) * 0.5 }, this.animationDuration )
    			.easing( this.animationEasing )
    			.start();

    		} else {

    			this.children[i].visible = false;

    		}

    		this.children[i].outline && (this.children[i].outline.visible = false);

    	}

    	// Forward
    	for ( var i = this.offset + 1; i < this.children.length ; i++ ) {

    		if ( this.tileArray.indexOf(this.children[i]) === -1 ) { continue; }

    		if ( i - this.offset <= this.visibleDelta ) {

    			this.children[i].visible = true;
    			new TWEEN.Tween( this.children[i].material )
    			.to( { opacity: 1 / ( i - this.offset ) * 0.5 }, this.animationDuration )
    			.easing( this.animationEasing )
    			.start();

    		} else {

    			this.children[i].visible = false;

    		}

    		this.children[i].outline && (this.children[i].outline.visible = false);

    	}

    };

    /**
     * Scroll up
     * @param  {number} duration - Scroll up duration
     */
    PANOLENS.TileGroup.prototype.scrollUp = function ( duration ) {

    	var tiles = this.tileArray, offset;

    	duration = duration !== undefined ? duration : this.animationDuration;

    	offset = this.offset + 1;

    	if ( this.offset < tiles.length - 1 && tiles[ this.offset + 1 ].material.visible ) {

    		for ( var i = tiles.length - 1; i >= 0; i-- ) {
	    		
    			new TWEEN.Tween( tiles[i].position )
    			.to({ y: ( i - offset ) * -this.v_gap,
    				  z: Math.abs( i - offset ) * -this.d_gap }, duration )
    			.easing( this.animationEasing )
    			.start();
	    		
	    	}

	    	this.offset ++;
	    	this.updateVisbility();
	    	this.dispatchEvent( { type: 'scroll', direction: 'up' } );

    	}

    };

    /**
     * Scroll down 
     * @param  {number} duration - Scroll up duration
     */
    PANOLENS.TileGroup.prototype.scrollDown = function ( duration ) {

    	var tiles = this.tileArray, offset;

    	duration = duration !== undefined ? duration : this.animationDuration;

    	offset = this.offset - 1;

    	if ( this.offset > 0 && tiles[ this.offset - 1 ].material.visible ) {

    		for ( var i = 0; i < tiles.length; i++ ) {

	    		new TWEEN.Tween( tiles[i].position )
    			.to({ y: ( i - offset ) * -this.v_gap,
    				  z: Math.abs( i - offset ) * -this.d_gap }, duration )
    			.easing( this.animationEasing )
    			.start();
	    		
	    	}

	    	this.offset --;
	    	this.updateVisbility();
	    	this.dispatchEvent( { type: 'scroll', direction: 'down' } );

    	}

    };

    PANOLENS.TileGroup.prototype.reset = function () {

    	this.tileArray.map( function ( child, index ) {

    		child.position.copy( child.originalPosition );

    	} );

    	this.offset = 0;
    	this.updateVisbility();

    };

    /**
     * Get current index
     * @return {number} Index of the group. Range from 0 to this.tileArray.length
     */
    PANOLENS.TileGroup.prototype.getIndex = function () {

    	return this.offset;

    };

    /**
     * Get visible tile counts
     * @return {number} Number of visible tiles
     */
    PANOLENS.TileGroup.prototype.getTileCount = function () {

    	var count = 0;

    	this.tileArray.map( function ( tile ) {

    		if ( tile.material.visible ) {

    			count ++;

    		}

    	} );

    	return count;

    };

})();