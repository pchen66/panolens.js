( function () {

	/**
	 * Information spot attached to panorama
	 * @constructor
	 * @param {number} [scale=300] - Infospot scale
	 * @param {imageSrc} [imageSrc=PANOLENS.DataImage.Info] - Image overlay info
	 * @param {boolean} [animated=true] - Enable default hover animation
	 */
	PANOLENS.Infospot = function ( scale, imageSrc, animated ) {
		
		var scope = this, ratio, startScale, endScale, duration;

		scale = scale || 300;
		imageSrc = imageSrc || PANOLENS.DataImage.Info;
		duration = 500;

		THREE.Sprite.call( this );

		this.type = 'infospot';

		this.animated = animated !== undefined ? animated : true;
		this.isHovering = false;
		this.visible = false;

		this.element;
		this.toPanorama;
		this.cursorStyle;

		this.mode = PANOLENS.Modes.UNKNOWN;

		this.scale.set( scale, scale, 1 );
		this.rotation.y = Math.PI;
		this.scaleFactor = 1.3;

		this.container;

		// Event Handler
		this.HANDLER_FOCUS;

		PANOLENS.Utils.TextureLoader.load( imageSrc, postLoad );		

		function postLoad ( texture ) {

			texture.wrapS = THREE.RepeatWrapping;
			texture.repeat.x = - 1;

			texture.image.width = texture.image.naturalWidth || 64;
			texture.image.height = texture.image.naturalHeight || 64;

			ratio = texture.image.width / texture.image.height;
			scope.scale.set( ratio * scale, scale, 1 );

			startScale = scope.scale.clone();

			scope.scaleUpAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: startScale.x * scope.scaleFactor, y: startScale.y * scope.scaleFactor }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.scaleDownAnimation = new TWEEN.Tween( scope.scale )
				.to( { x: startScale.x, y: startScale.y }, duration )
				.easing( TWEEN.Easing.Elastic.Out );

			scope.material.side = THREE.DoubleSide;
			scope.material.map = texture;
			scope.material.depthTest = false;
			scope.material.needsUpdate = true;

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
		this.addEventListener( 'panolens-dual-eye-effect', this.onDualEyeEffect );
		this.addEventListener( 'panolens-container', this.setContainer.bind( this ) );
		this.addEventListener( 'dismiss', this.onDismiss );
		this.addEventListener( 'panolens-infospot-focus', this.setFocusMethod );

	};

	PANOLENS.Infospot.prototype = Object.create( THREE.Sprite.prototype );

	/**
	 * Set infospot container
	 * @param {HTMLElement|object} data - Data with container information
	 */
	PANOLENS.Infospot.prototype.setContainer = function ( data ) {

		var container;

		if ( data instanceof HTMLElement ) {

			container = data;

		} else if ( data && data.container ) {

			container = data.container;

		}

		// Append element if exists
		if ( container && this.element ) {

			container.appendChild( this.element );

		}

		this.container = container;

	};

	/**
	 * Get container
	 * @return {HTMLElement} - The container of this infospot
	 */
	PANOLENS.Infospot.prototype.getContainer = function () {

		return this.container;

	};

	/**
	 * This will be called by a click event
	 * Translate and lock the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	PANOLENS.Infospot.prototype.onClick = function ( event ) {

		if ( this.element && this.getContainer() ) {

			this.onHoverStart( event );

			// Lock element
			this.lockHoverElement();

		}

	};

	/**
	 * Dismiss current element if any
	 * @param  {object} event - Dismiss event
	 */
	PANOLENS.Infospot.prototype.onDismiss = function ( event ) {

		if ( this.element ) {

			this.unlockHoverElement();
			this.onHoverEnd();

		}

	};

	/**
	 * This will be called by a mouse hover event
	 * Translate the hovering element if any
	 * @param  {object} event - Event containing mouseEvent with clientX and clientY
	 */
	PANOLENS.Infospot.prototype.onHover = function ( event ) {

	};

	/**
	 * This will be called on a mouse hover start
	 * Sets cursor style to 'pointer', display the element and scale up the infospot
	 */
	PANOLENS.Infospot.prototype.onHoverStart = function ( event ) {

		if ( !this.getContainer() ) { return; }

		var cursorStyle = this.cursorStyle || ( this.mode === PANOLENS.Modes.NORMAL ? 'pointer' : 'default' );

		this.isHovering = true;
		this.container.style.cursor = cursorStyle;
		
		if ( this.animated ) {

			this.scaleDownAnimation && this.scaleDownAnimation.stop();
			this.scaleUpAnimation && this.scaleUpAnimation.start();

		}
		
		if ( this.element && event.mouseEvent.clientX >= 0 && event.mouseEvent.clientY >= 0 ) {

			if ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) {

				this.element.style.display = 'none';
				this.element.left && ( this.element.left.style.display = 'block' );
				this.element.right && ( this.element.right.style.display = 'block' );

				// Store element width for reference
				this.element._width = this.element.left.clientWidth;
				this.element._height = this.element.left.clientHeight;

			} else {

				this.element.style.display = 'block';
				this.element.left && ( this.element.left.style.display = 'none' );
				this.element.right && ( this.element.right.style.display = 'none' );

				// Store element width for reference
				this.element._width = this.element.clientWidth;
				this.element._height = this.element.clientHeight;

			}
			
		}

	};

	/**
	 * This will be called on a mouse hover end
	 * Sets cursor style to 'default', hide the element and scale down the infospot
	 */
	PANOLENS.Infospot.prototype.onHoverEnd = function () {

		if ( !this.getContainer() ) { return; }

		this.isHovering = false;
		this.container.style.cursor = 'default';

		if ( this.animated ) {

			this.scaleUpAnimation && this.scaleUpAnimation.stop();
			this.scaleDownAnimation && this.scaleDownAnimation.start();

		}

		if ( this.element && !this.element.locked ) {

			this.element.style.display = 'none';
			this.element.left && ( this.element.left.style.display = 'none' );
			this.element.right && ( this.element.right.style.display = 'none' );

			this.unlockHoverElement();

		}

	};

	/**
	 * On dual eye effect handler
	 * Creates duplicate left and right element
	 * @param  {object} event - panolens-dual-eye-effect event
	 */
	PANOLENS.Infospot.prototype.onDualEyeEffect = function ( event ) {
		
		if ( !this.getContainer() ) { return; }

		var element, halfWidth, halfHeight;

		this.mode = event.mode;

		element = this.element;

		halfWidth = this.container.clientWidth / 2;
		halfHeight = this.container.clientHeight / 2;

		if ( !element ) {

			return;

		}

		if ( !element.left || !element.right ) {

			element.left = element.cloneNode( true );
			element.right = element.cloneNode( true );

		}

		if ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) {

			element.left.style.display = element.style.display;
			element.right.style.display = element.style.display;
			element.style.display = 'none';

		} else {

			element.style.display = element.left.style.display;
			element.left.style.display = 'none';
			element.right.style.display = 'none';

		}

		// Update elements translation
		this.translateElement( halfWidth, halfHeight );

		this.container.appendChild( element.left );
		this.container.appendChild( element.right );

	};

	/**
	 * Translate the hovering element by css transform
	 * @param  {number} x - X position on the window screen
	 * @param  {number} y - Y position on the window screen
	 */
	PANOLENS.Infospot.prototype.translateElement = function ( x, y ) {

		if ( !this.element._width || !this.element._height || !this.getContainer() ) {

			return;

		}

		var left, top, element, width, height, delta, container;

		container = this.container;
		element = this.element;
		width = element._width / 2;
		height = element._height / 2;
		delta = element.verticalDelta !== undefined ? element.verticalDelta : 40;

		left = x - width;
		top = y - height - delta;

		if ( ( this.mode === PANOLENS.Modes.CARDBOARD || this.mode === PANOLENS.Modes.STEREO ) 
				&& element.left && element.right
				&& !( x === container.clientWidth / 2 && y === container.clientHeight / 2 ) ) {

			left = container.clientWidth / 4 - width + ( x - container.clientWidth / 2 );
			top = container.clientHeight / 2 - height - delta + ( y - container.clientHeight / 2 );

			this.setElementStyle( 'transform', element.left, 'translate(' + left + 'px, ' + top + 'px)' );

			left += container.clientWidth / 2;

			this.setElementStyle( 'transform', element.right, 'translate(' + left + 'px, ' + top + 'px)' );

		} else {

			this.setElementStyle( 'transform', element, 'translate(' + left + 'px, ' + top + 'px)' );

		}

	};

	/**
	 * Set vendor specific css
	 * @param {string} type - CSS style name
	 * @param {HTMLElement} element - The element to be modified
	 * @param {string} value - Style value
	 */
	PANOLENS.Infospot.prototype.setElementStyle = function ( type, element, value ) {

		var style = element.style;

		if ( type === 'transform' ) {

			style.webkitTransform = style.msTransform = style.transform = value;

		}

	};

	/**
	 * Set hovering text content
	 * @param {string} text - Text to be displayed
	 */
	PANOLENS.Infospot.prototype.setText = function ( text ) {

		if ( this.element ) {

			this.element.textContent = text;

		}

	};

	/**
	 * Set cursor css style on hover
	 */
	PANOLENS.Infospot.prototype.setCursorHoverStyle = function ( style ) {

		this.cursorStyle = style;

	};

	/**
	 * Add hovering text element
	 * @param {string} text - Text to be displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	PANOLENS.Infospot.prototype.addHoverText = function ( text, delta ) {

		if ( !this.element ) {

			this.element = document.createElement( 'div' );
			this.element.style.display = 'none';
			this.element.style.color = '#fff';
			this.element.style.top = 0;
			this.element.style.maxWidth = '50%';
			this.element.style.maxHeight = '50%';
			this.element.style.textShadow = '0 0 3px #000000';
			this.element.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

		this.setText( text );

	};

	/**
	 * Add hovering element by cloning an element
	 * @param {HTMLDOMElement} el - Element to be cloned and displayed
	 * @param {number} [delta=40] - Vertical delta to the infospot
	 */
	PANOLENS.Infospot.prototype.addHoverElement = function ( el, delta ) {

		if ( !this.element ) { 

			this.element = el.cloneNode( true );
			this.element.style.display = 'none';
			this.element.style.top = 0;
			this.element.style.position = 'absolute';
			this.element.classList.add( 'panolens-infospot' );
			this.element.verticalDelta = delta !== undefined ? delta : 40;

		}

	};

	/**
	 * Remove hovering element
	 */
	PANOLENS.Infospot.prototype.removeHoverElement = function () {

		if ( this.element ) { 

			if ( this.element.left ) {

				this.container.removeChild( this.element.left );
				this.element.left = null;

			}

			if ( this.element.right ) {

				this.container.removeChild( this.element.right );
				this.element.right = null;

			}

			this.container.removeChild( this.element );
			this.element = null;

		}

	};

	/**
	 * Lock hovering element
	 */
	PANOLENS.Infospot.prototype.lockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = true;

		}

	};

	/**
	 * Unlock hovering element
	 */
	PANOLENS.Infospot.prototype.unlockHoverElement = function () {

		if ( this.element ) { 

			this.element.locked = false;

		}

	};

	/**
	 * Show infospot
	 * @param  {number} [delay=0] - Delay time to show
	 */
	PANOLENS.Infospot.prototype.show = function ( delay ) {

		delay = delay || 0;

		if ( this.animated ) {

			this.hideAnimation && this.hideAnimation.stop();
			this.showAnimation && this.showAnimation.delay( delay ).start();

		}

	};

	/**
	 * Hide infospot
	 * @param  {number} [delay=0] - Delay time to hide
	 */
	PANOLENS.Infospot.prototype.hide = function ( delay ) {

		delay = delay || 0;

		if ( this.animated ) {

			this.showAnimation && this.showAnimation.stop();
			this.hideAnimation && this.hideAnimation.delay( delay ).start();

		}
		
		
	};

	/**
	 * Set focus event handler
	 */
	PANOLENS.Infospot.prototype.setFocusMethod = function ( event ) {

		if ( event ) {

			this.HANDLER_FOCUS = event.method;

		}

	};

	/**
	 * Focus camera center to this infospot
	 * @param {number} [duration=1000] - Duration to tween
	 * @param {function} [easing=TWEEN.Easing.Exponential.Out] - Easing function
	 */
	PANOLENS.Infospot.prototype.focus = function ( duration, easing ) {

		if ( this.HANDLER_FOCUS ) {

			this.HANDLER_FOCUS( this.position, duration, easing );
			this.onDismiss();

		}

	};

	/**
	 * Dispose infospot
	 */
	PANOLENS.Infospot.prototype.dispose = function () {

		this.removeHoverElement();
		this.material.dispose();

		if ( this.parent ) {

			this.parent.remove( this );

		}

	};

} )();