( function () {

	/**
	 * Information spot attached to panorama
	 * @constructor
	 * @param {number} [scale=1] - Infospot scale
	 * @param {imageSrc} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
	 * @param {HTMLElement} [container=document.body] - The dom element contains infospot elements
	 */
	PANOLENS.Infospot = function ( scale, imageSrc, container ) {
		
		var scope = this, ratio, startScale, endScale, duration;

		scale = scale || 1;
		imageSrc = imageSrc || PANOLENS.DataImage.Info;
		duration = 500;

		THREE.Sprite.call( this );

		this.type = 'infospot';

		this.isHovering = false;
		this.visible = false;

		this.element;
		this.toPanorama;

		this.scale.set( scale, scale, 1 );
		this.rotation.y = Math.PI;

		this.container = container || document.body;

		PANOLENS.Utils.TextureLoader.load( imageSrc, postLoad );		

		function postLoad ( texture ) {
			
			scope.material.side = THREE.DoubleSide;
			scope.material.map = texture;
			scope.material.depthTest = false;

			ratio = texture.image.width / texture.image.height;

			scope.scale.set( ratio * scale, scale, 1 );

			startScale = scope.scale.clone();
			endScale = scope.scale.clone().multiplyScalar( 1.3 );
			endScale.z = 1;

			scope.scaleUpAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: endScale.x, y: endScale.y }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.scaleDownAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: startScale.x, y: startScale.y }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

		}

		function show () {

			this.visible = true;

		}

		function hide () {

			this.visible = false;

		}

		// Add show and hide animations
		this.showAnimation = new TWEEN.Tween( this.material )
			.to( { opacity: 1 }, duration )
			.onStart( show.bind( this ) )
			.easing( TWEEN.Easing.Quartic.Out );

		this.hideAnimation = new TWEEN.Tween( this.material )
			.to( { opacity: 0 }, duration )
			.onComplete( hide.bind( this ) )
			.easing( TWEEN.Easing.Quartic.Out );

		// Attach event listeners
		this.addEventListener( 'click', this.onClick );
		this.addEventListener( 'hover', this.onHover );
		this.addEventListener( 'hoverenter', this.onHoverStart );
		this.addEventListener( 'hoverleave', this.onHoverEnd );

	}

	PANOLENS.Infospot.prototype = Object.create( THREE.Sprite.prototype );

	PANOLENS.Infospot.prototype.onClick = function ( event ) {

		if ( this.element ) {

			this.translateElement( event.mouseEvent.clientX, event.mouseEvent.clientY );

			// Lock element
			this.lockHoverElement();

		}

	};

	PANOLENS.Infospot.prototype.onHover = function ( event ) {

		if ( this.element && !this.element.locked ) {

			this.translateElement( event.mouseEvent.clientX, event.mouseEvent.clientY );

		}

	};

	PANOLENS.Infospot.prototype.onHoverStart = function() {

		this.isHovering = true;
		this.container.style.cursor = 'pointer';
		this.scaleDownAnimation.stop();
		this.scaleUpAnimation.start();

		if ( this.element ) {

			this.element.style.display = 'block';

		}

	};

	PANOLENS.Infospot.prototype.onHoverEnd = function() {

		this.isHovering = false;
		this.container.style.cursor = 'default';
		this.scaleUpAnimation.stop();
		this.scaleDownAnimation.start();

		if ( this.element ) {

			this.element.style.display = 'none';
			this.unlockHoverElement();

		}

	};

	PANOLENS.Infospot.prototype.translateElement = function ( x, y ) {

		var left, top;

		this.element.style.display = 'block';

		left = x - this.element.clientWidth / 2;
		top = y - this.element.clientHeight - 30;

		this.element.style.webkitTransform =
		this.element.style.msTransform =
		this.element.style.transform = 'translate(' + left + 'px, ' + top + 'px)';

	};

	PANOLENS.Infospot.prototype.setText = function ( text ) {

		if ( this.element ) {

			this.element.textContent = text;

		}

	};

	PANOLENS.Infospot.prototype.addHoverText = function ( text ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );

			this.element.style.display = 'none';
			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'fixed';
			this.element.classList.add( 'panolens-infospot' );

			this.container.appendChild( this.element );

		}

		this.setText( text );

	};

	PANOLENS.Infospot.prototype.addHoverElement = function ( el ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.display = 'none';
			this.element.style.top = 0;
			this.element.style.position = 'fixed';
			this.element.classList.add( 'panolens-infospot' );

			this.container.appendChild( this.element );

		}

	};

	PANOLENS.Infospot.prototype.removeHoverElement = function () {

		if ( this.element ) { 

			this.container.removeChild( this.element );

			this.element = undefined;

		}

	};

	PANOLENS.Infospot.prototype.lockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = true;

		}

	};

	PANOLENS.Infospot.prototype.unlockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = false;

		}

	};

	PANOLENS.Infospot.prototype.show = function ( delay ) {

		delay = delay || 0;

		this.hideAnimation && this.hideAnimation.stop();
		this.showAnimation && this.showAnimation.delay( delay ).start();

	};

	PANOLENS.Infospot.prototype.hide = function ( delay ) {

		delay = delay || 0;

		this.showAnimation && this.showAnimation.stop();
		this.hideAnimation && this.hideAnimation.delay( delay ).start();
		
	};

} )()