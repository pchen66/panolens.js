( function () {

	'use strict';

	/**
	 * Viewer contains pre-defined scene, camera and renderer
	 * @constructor
	 * @param {object} [options] - Use custom or default config options
	 * @param {HTMLElement} [options.container] - A HTMLElement to host the canvas
	 * @param {THREE.Scene} [options.scene=THREE.Scene] - A THREE.Scene which contains panorama and 3D objects
	 * @param {THREE.Camera} [options.camera=THREE.PerspectiveCamera] - A THREE.Camera to view the scene
	 * @param {THREE.WebGLRenderer} [options.renderer=THREE.WebGLRenderer] - A THREE.WebGLRenderer to render canvas
	 * @param {boolean} [options.controlBar=true] - Show/hide control bar on the bottom of the container
	 * @param {array}   [options.controlButtons=[]] - Button names to mount on controlBar if controlBar exists, Defaults to ['fullscreen', 'navigation', 'vr', 'video']
	 * @param {boolean} [options.autoHideControlBar=false] - Auto hide control bar when click on non-active area
	 * @param {boolean} [options.autoHideInfospot=false] - Auto hide infospots when click on non-active area
	 * @param {boolean} [options.horizontalView=false] - Allow only horizontal camera control
	 * @param {number}  [options.clickTolerance=10] - Distance tolerance to tigger click / tap event
	 * @param {number}  [options.cameraFov=60] - Camera field of view value
	 * @param {boolean} [options.reverseDragging=false] - Reverse dragging direction
	 * @param {boolean} [options.enableReticle=false] - Enable reticle for mouseless interaction
	 * @param {number}  [options.dwellTime=1500] - Dwell time for reticle selection
	 * @param {boolean} [options.autoReticleSelect=true] - Auto select a clickable target after dwellTime
	 */
	PANOLENS.Viewer = function ( options ) {

		THREE.EventDispatcher.call( this );
		
		if ( !THREE ) {

			console.error('Three.JS not found');

			return;
		}

		options = options || {};
		options.controlBar = options.controlBar !== undefined ? options.controlBar : true;
		options.controlButtons = options.controlButtons || [ 'fullscreen', 'navigation', 'vr', 'video' ];
		options.autoHideControlBar = options.autoHideControlBar !== undefined ? options.autoHideControlBar : false;
		options.autoHideInfospot = options.autoHideInfospot !== undefined ? options.autoHideInfospot : true;
		options.horizontalView = options.horizontalView !== undefined ? options.horizontalView : false;
		options.clickTolerance = options.clickTolerance || 10;
		options.cameraFov = options.cameraFov || 60;
		options.reverseDragging = options.reverseDragging || false;
		options.enableReticle = options.enableReticle || false;
		options.dwellTime = options.dwellTime || 1500;
		options.autoReticleSelect = options.autoReticleSelect !== undefined ? options.autoReticleSelect : true;
		
		this.options = options;
		this.container;

		// Container
		if ( options.container ) {

			this.container = options.container;

		} else {

			this.container = document.createElement( 'div' );
			this.container.style.width = window.innerWidth + 'px';
			this.container.style.height = window.innerHeight + 'px';
			document.body.appendChild( this.container );

			// For matching body's width and height dynamically on the next tick to 
			// avoid 0 height in the beginning
			setTimeout( function () {
				this.container.style.width = '100%';
				this.container.style.height = '100%';
			}.bind( this ), 0 );

		}

		this.camera = options.camera || new THREE.PerspectiveCamera( this.options.cameraFov, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
		this.scene = options.scene || new THREE.Scene();
		this.renderer = options.renderer || new THREE.WebGLRenderer( { alpha: true, antialias: true } );
		this.effect;
		this.reticle = {};

		this.mode = PANOLENS.Modes.NORMAL;

		this.OrbitControls;
		this.DeviceOrientationControls;

		this.controls;
		this.panorama;
		this.widget;
		
		this.hoverObject;
		this.infospot;
		this.pressEntityObject;
		this.pressObject;

		this.raycaster = new THREE.Raycaster();
		this.raycasterPoint = new THREE.Vector2();
		this.userMouse = new THREE.Vector2();
		this.updateCallbacks = [];
		this.requestAnimationId;

		// Handler references
		this.HANDLER_MOUSE_DOWN = this.onMouseDown.bind( this );
		this.HANDLER_MOUSE_UP = this.onMouseUp.bind( this );
		this.HANDLER_MOUSE_MOVE = this.onMouseMove.bind( this );
		this.HANDLER_WINDOW_RESIZE = this.onWindowResize.bind( this );
		this.HANDLER_KEY_DOWN = this.onKeyDown.bind( this );
		this.HANDLER_KEY_UP = this.onKeyUp.bind( this );
		this.HANDLER_TAP = this.onTap.bind( this, {
			clientX: this.container.clientWidth / 2,
			clientY: this.container.clientHeight / 2
		} );

		// Flag for infospot output
		this.OUTPUT_INFOSPOT = false;

		// Renderer
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
		this.renderer.setClearColor( 0x000000, 1 );

		// Append Renderer Element to container
		this.renderer.domElement.classList.add( 'panolens-canvas' );
		this.renderer.domElement.style.display = 'block';
		this.container.appendChild( this.renderer.domElement );

		// Camera Controls
		this.OrbitControls = new THREE.OrbitControls( this.camera, this.container );
		this.OrbitControls.name = 'orbit';
		this.OrbitControls.minDistance = 1;
		this.OrbitControls.noPan = true;
		this.DeviceOrientationControls = new THREE.DeviceOrientationControls( this.camera );
		this.DeviceOrientationControls.name = 'device-orientation';

		// Cardboard effect
        this.effect = new THREE.CardboardEffect( this.renderer );
        this.effect.setSize( this.container.clientWidth, this.container.clientHeight );

		this.controls = [ this.OrbitControls, this.DeviceOrientationControls ];
		this.control = this.OrbitControls;
		
		// Lock horizontal view
		if ( this.options.horizontalView ) {
			this.OrbitControls.minPolarAngle = Math.PI / 2;
			this.OrbitControls.maxPolarAngle = Math.PI / 2;
		}

		// Add Control UI
		if ( this.options.controlBar !== false ) {
			this.addDefaultControlBar( this.options.controlButtons );
		}

		// Reverse dragging direction
		if ( this.options.reverseDragging ) {
			this.reverseDraggingDirection();
		}

		// Register event if reticle is enabled, otherwise defaults to mouse
		if ( this.options.enableReticle ) {
			this.registerReticleEvent();
		} else {
			this.registerMouseAndTouchEvents();
		}
		
		// Register dom event listeners
		this.registerEventListeners();

		// Animate
		this.animate.call( this );

	}

	PANOLENS.Viewer.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Viewer.prototype.constructor = PANOLENS.Viewer;

	/**
	 * Add an object to the scene
	 * Automatically hookup with panolens-viewer-handler listener
	 * to communicate with viewer method
	 * @param {THREE.Object3D} object - The object to be added
	 */
	PANOLENS.Viewer.prototype.add = function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		this.scene.add( object );

		// All object added to scene has 'panolens-viewer-handler' event to handle viewer communication
		if ( object.addEventListener ) {

			object.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		// Hookup default panorama event listeners
		if ( object.type === 'panorama' ) {

			this.addPanoramaEventListener( object );

			if ( !this.panorama ) {

				this.setPanorama( object );

			}

		}

	};

	/**
	 * Remove an object from the scene
	 * @param  {THREE.Object3D} object - Object to be removed
	 */
	PANOLENS.Viewer.prototype.remove = function ( object ) {

		if ( object.removeEventListener ) {

			object.removeEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );

		}

		this.scene.remove( object );

	};

	/**
	 * Add default control bar
	 * @param {array} array - The control buttons array
	 */
	PANOLENS.Viewer.prototype.addDefaultControlBar = function ( array ) {

		var scope = this;

		if ( this.widget ) {

			console.warn( 'Default control bar exists' );
			return;

		}

		this.widget = new PANOLENS.Widget( this.container );
		this.widget.addEventListener( 'panolens-viewer-handler', this.eventHandler.bind( this ) );
		this.widget.addControlBar();
		array.forEach( function( buttonName ){

			scope.widget.addControlButton( buttonName );

		} );

	};

	/**
	 * Set a panorama to be the current one
	 * @param {PANOLENS.Panorama} pano - Panorama to be set
	 */
	PANOLENS.Viewer.prototype.setPanorama = function ( pano ) {

		if ( pano.type === 'panorama' ) {
			
			// Clear exisiting infospot
			this.hideInfospot();

			// Reset Current Panorama
			this.panorama && this.panorama.onLeave();

			// Assign and enter panorama
			(this.panorama = pano).onEnter();
			
		}

	};

	/**
	 * Event handler to execute commands from child objects
	 * @param  {object} event - The dispatched event with method as function name and data as an argument
	 */
	PANOLENS.Viewer.prototype.eventHandler = function ( event ) {

		if ( event.method && this[ event.method ] ) {

			this[ event.method ]( event.data );

		}

	};

	/**
	 * Toggle VR effect mode and broadcast event to infospot descendants
	 * @fires PANOLENS.Viewer#VR-toggle
	 * @fires PANOLENS.Infospot#VR-toggle
	 */
	PANOLENS.Viewer.prototype.toggleVR = function () {

		var event;

		if ( this.effect ) {

			if ( this.mode !== PANOLENS.Modes.VR ) {

				this.enableVR();

			} else {

				this.disableVR();

			}
		}

		event = { type: 'VR-toggle', mode: this.mode };

		/**
		 * Toggle vr event
		 * @type {object}
		 * @event PANOLENS.Viewer#VR-toggle
		 * @event PANOLENS.Infospot#VR-toggle
		 * @property {PANOLENS.Modes} mode - Current display mode
		 */
		this.dispatchEvent( event );
		this.scene.traverse( function ( object ) {

			if ( object.dispatchEvent ) {

				object.dispatchEvent( event );

			}

		});

	};

	/**
	 * Enable VR effect
	 */
	PANOLENS.Viewer.prototype.enableVR = function () {

		if ( this.effect && this.mode !== PANOLENS.Modes.VR ) {

			this.mode = PANOLENS.Modes.VR;

		}

	};

	/**
	 * Disable VR effect
	 */
	PANOLENS.Viewer.prototype.disableVR = function () {

		if ( this.effect && this.mode !== PANOLENS.Modes.NORMAL ) {

			this.mode = PANOLENS.Modes.NORMAL;

		}

	};

	/**
	 * Toggle video play or stop
	 * @fires PANOLENS.Viewer#video-toggle
	 */
	PANOLENS.Viewer.prototype.toggleVideoPlay = function () {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			/**
			 * Toggle video event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-toggle
			 */
			this.panorama.dispatchEvent( { type: 'video-toggle' } );

		}

	};

	/**
	 * Set currentTime in a video
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-time
	 */
	PANOLENS.Viewer.prototype.setVideoCurrentTime = function ( percentage ) {

		if ( this.panorama instanceof PANOLENS.VideoPanorama ) {

			/**
			 * Setting video time event
			 * @type {object}
			 * @event PANOLENS.Viewer#video-time
			 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
			 */
			this.panorama.dispatchEvent( { type: 'video-time', percentage: percentage } );

		}

	};

	/**
	 * This will be called when video updates if an widget is present
	 * @param {number} percentage - Percentage of a video. Range from 0.0 to 1.0
	 * @fires PANOLENS.Viewer#video-update
	 */
	PANOLENS.Viewer.prototype.onVideoUpdate = function ( percentage ) {

		/**
		 * Video update event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-update
		 * @property {number} percentage - Percentage of a video. Range from 0.0 to 1.0
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-update', percentage: percentage } );

	};

	/**
	 * Add update callback to be called every animation frame
	 */
	PANOLENS.Viewer.prototype.addUpdateCallback = function ( fn ) {

		if ( fn ) {

			this.updateCallbacks.push( fn );

		}

	};

	/**
	 * Remove update callback
	 * @param  {Function} fn - The function to be removed
	 */
	PANOLENS.Viewer.prototype.removeUpdateCallback = function ( fn ) {

		var index = this.updateCallbacks.indexOf( fn );

		if ( fn && index >= 0 ) {

			this.updateCallbacks.splice( index, 1 );

		}

	};

	/**
	 * Show video widget
	 */
	PANOLENS.Viewer.prototype.showVideoWidget = function () {

		/**
		 * Show video widget event
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-show
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-show' } );

	};

	/**
	 * Hide video widget
	 */
	PANOLENS.Viewer.prototype.hideVideoWidget = function () {

		/**
		 * Hide video widget
		 * @type {object}
		 * @event PANOLENS.Viewer#video-control-hide
		 */
		this.widget && this.widget.dispatchEvent( { type: 'video-control-hide' } );

	};

	/**
	 * Add default panorama event listeners
	 * @param {PANOLENS.Panorama} pano - The panorama to be added with event listener
	 */
	PANOLENS.Viewer.prototype.addPanoramaEventListener = function ( pano ) {

		// Set camera control on every panorama
		pano.addEventListener( 'enter-animation-start', this.setCameraControl.bind( this ) );

		// Show and hide widget event only when it's PANOLENS.VideoPanorama
		if ( pano instanceof PANOLENS.VideoPanorama ) {

			pano.addEventListener( 'enter', this.showVideoWidget.bind( this ) );
			pano.addEventListener( 'leave', this.hideVideoWidget.bind( this ) );

		}


	};

	/**
	 * Set camera control
	 */
	PANOLENS.Viewer.prototype.setCameraControl = function () {

		this.camera.position.copy( this.panorama.position );
		this.camera.position.z += 1;
		this.OrbitControls.target.copy( this.panorama.position );

	};

	/**
	 * Get current camera control
	 * @return {object} - Current navigation control. THREE.OrbitControls or THREE.DeviceOrientationControls
	 */
	PANOLENS.Viewer.prototype.getControl = function () {

		return this.control;

	},

	/**
	 * Get scene
	 * @return {THREE.Scene} - Current scene which the viewer is built on
	 */
	PANOLENS.Viewer.prototype.getScene = function () {

		return this.scene;

	};

	/**
	 * Get camera
	 * @return {THREE.Camera} - The scene camera
	 */
	PANOLENS.Viewer.prototype.getCamera = function () {

		return this.camera;

	},

	/**
	 * Get renderer
	 * @return {THREE.WebGLRenderer} - The renderer using webgl
	 */
	PANOLENS.Viewer.prototype.getRenderer = function () {

		return this.renderer;

	};

	/**
	 * Get container
	 * @return {HTMLDOMElement} - The container holds rendererd canvas
	 */
	PANOLENS.Viewer.prototype.getContainer = function () {

		return this.container;

	};

	/**
	 * Get control name
	 * @return {string} - Control name. 'orbit' or 'device-orientation'
	 */
	PANOLENS.Viewer.prototype.getControlName = function () {

		return this.control.name;

	};

	/**
	 * Get next navigation control name
	 * @return {string} - Next control name
	 */
	PANOLENS.Viewer.prototype.getNextControlName = function () {

		return this.controls[ this.getNextControlIndex() ].name;

	};

	/**
	 * Get next navigation control index
	 * @return {number} - Next control index
	 */
	PANOLENS.Viewer.prototype.getNextControlIndex = function () {

		var controls, control, nextIndex;

		controls = this.controls;
		control = this.control;
		nextIndex = controls.indexOf( control ) + 1;

		return ( nextIndex >= controls.length ) ? 0 : nextIndex;

	};

	/**
	 * Set field of view of camera
	 */
	PANOLENS.Viewer.prototype.setCameraFov = function ( fov ) {

		this.camera.fov = fov;
		this.camera.updateProjectionMatrix();

	};

	/**
	 * Enable control by index
	 * @param  {number} index - Index of camera control
	 */
	PANOLENS.Viewer.prototype.enableControl = function ( index ) {

		index = ( index >= 0 && index < this.controls.length ) ? index : 0;

		this.control.enabled = false;

		this.control = this.controls[ index ];

		this.control.enabled = true;

		switch ( this.control.name ) {
			case 'orbit':
				this.camera.position.copy( this.panorama.position );
				this.camera.position.z += 1;
				break;
			case 'device-orientation':
				this.camera.position.copy( this.panorama.position );
				break;
			default:
				break;
		}

	};

	/**
	 * Toggle next control
	 */
	PANOLENS.Viewer.prototype.toggleNextControl = function () {

		this.enableControl( this.getNextControlIndex() );

	};

	/**
	 * Toggle fullscreen
	 * @param  {Boolean} isFullscreen - If it's fullscreen
	 */
	PANOLENS.Viewer.prototype.toggleFullscreen = function ( isFullscreen ) {

		if ( isFullscreen ) {
			this.container._width = this.container.clientWidth;
			this.container._height = this.container.clientHeight;
			this.container.style.width = '100%';
			this.container.style.height = '100%';
		} else {
			this.container._width && ( this.container.style.width = this.container._width + 'px' );
			this.container._height && ( this.container.style.height = this.container._height + 'px' );
		}

	};

	/**
	 * Reverse dragging direction
	 */
	PANOLENS.Viewer.prototype.reverseDraggingDirection = function () {

		this.OrbitControls.rotateSpeed *= -1;
		this.OrbitControls.momentumScalingFactor *= -1;

	};

	/**
	 * This is called when window size is changed
	 * @fires PANOLENS.Viewer#window-resize
	 */
	PANOLENS.Viewer.prototype.onWindowResize = function () {

		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

		// Update reticle
		if ( this.options.enableReticle ) {

			this.updateReticleEvent( this.mode );

		}
		

		/**
		 * Window resizing event
		 * @type {object}
		 * @event PANOLENS.Viewer#window-resize
		 * @property {number} width  - Width of the window
		 * @property {number} height - Height of the window
		 */
		this.dispatchEvent( { type: 'window-resize', width: this.container.clientWidth, height: this.container.clientHeight })
	};

	/**
	 * Rendering function to be called on every animation frame
	 */
	PANOLENS.Viewer.prototype.render = function () {

		TWEEN.update();
		this.updateCallbacks.forEach( function( callback ){ callback(); } );
		this.control && this.control.update();
		
		if ( this.mode === PANOLENS.Modes.VR ) {

			this.effect.render( this.scene, this.camera );

		} else {

			this.renderer.render( this.scene, this.camera );

		}

	};

	/**
	 * Output infospot attach position in console.warn by holding down Ctrl button
	 */
	PANOLENS.Viewer.prototype.outputInfospotPosition = function () {

		var intersects;

		intersects = this.raycaster.intersectObject( this.panorama, true );

		if ( intersects.length > 0 ) {

			intersects[0].point.applyAxisAngle( new THREE.Vector3( -1, 0, 0 ), this.panorama.rotation.x );
			intersects[0].point.applyAxisAngle( new THREE.Vector3( 0, -1, 0 ), this.panorama.rotation.y );
			intersects[0].point.applyAxisAngle( new THREE.Vector3( 0, 0, -1 ), this.panorama.rotation.z );

			intersects[0].point.sub( this.panorama.position );

			console.info('{ ' + (-intersects[0].point.x).toFixed(2) + 
				', ' + (intersects[0].point.y).toFixed(2) +
				', ' + (intersects[0].point.z).toFixed(2) + ' }'
			);

		}

	};

	PANOLENS.Viewer.prototype.onMouseDown = function ( event ) {

		event.preventDefault();

		this.userMouse.x = ( event.clientX ) ? event.clientX : event.touches[0].clientX;
		this.userMouse.y = ( event.clientY ) ? event.clientY : event.touches[0].clientY;
		this.userMouse.type = 'mousedown';
		this.onTap( event );

	};

	PANOLENS.Viewer.prototype.onMouseMove = function ( event ) {

		event.preventDefault();
		this.userMouse.type = 'mousemove';
		this.onTap( event );

	};

	PANOLENS.Viewer.prototype.onMouseUp = function ( event ) {

		var onTarget = false, type;

		this.userMouse.type = 'mouseup';

		type = ( this.userMouse.x >= event.clientX - this.options.clickTolerance 
				&& this.userMouse.x <= event.clientX + this.options.clickTolerance
				&& this.userMouse.y >= event.clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.clientY + this.options.clickTolerance ) 
				||  ( event.changedTouches 
				&& this.userMouse.x >= event.changedTouches[0].clientX - this.options.clickTolerance
				&& this.userMouse.x <= event.changedTouches[0].clientX + this.options.clickTolerance 
				&& this.userMouse.y >= event.changedTouches[0].clientY - this.options.clickTolerance
				&& this.userMouse.y <= event.changedTouches[0].clientY + this.options.clickTolerance ) 
		? 'click' : undefined;

		// Event should happen on canvas
		if ( event && event.target && !event.target.classList.contains( 'panolens-canvas' ) ) { return; }

		event.preventDefault();

		if ( event.changedTouches && event.changedTouches.length === 1 ) {

			onTarget = this.onTap( { clientX : event.changedTouches[0].clientX, clientY : event.changedTouches[0].clientY }, type );
		
		} else {

			onTarget = this.onTap( event, type );

		}

		this.userMouse.type = 'none';

		if ( onTarget ) { 

			return; 

		}

		if ( type === 'click' ) {

			this.options.autoHideInfospot && this.panorama && this.panorama.toggleInfospotVisibility();
			this.options.autoHideControlBar && this.toggleControlBar();

		}

	};

	PANOLENS.Viewer.prototype.onTap = function ( event, type ) {

		var intersects, intersect_entity, intersect, reticle;

		this.raycasterPoint.x = ( ( event.clientX - this.renderer.domElement.offsetLeft ) / this.renderer.domElement.clientWidth ) * 2 - 1;
    	this.raycasterPoint.y = - ( ( event.clientY - this.renderer.domElement.offsetTop ) / this.renderer.domElement.clientHeight ) * 2 + 1;

		this.raycaster.setFromCamera( this.raycasterPoint, this.camera );

		// Return if no panorama 
		if ( !this.panorama ) { 

			return; 

		}

		// output infospot information
		if ( this.OUTPUT_INFOSPOT ) { 

			this.outputInfospotPosition(); 

		}

		intersects = this.raycaster.intersectObjects( this.panorama.children, true );

		intersect_entity = this.getConvertedIntersect( intersects );

		intersect = ( intersects.length > 0 ) ? intersects[0].object : intersect;

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect_entity && this.pressEntityObject === intersect_entity && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

			}

			this.pressEntityObject = undefined;

		}

		if ( this.userMouse.type === 'mouseup'  ) {

			if ( intersect && this.pressObject === intersect && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

			}

			this.pressObject = undefined;

		}

		if ( type === 'click' ) {

			this.panorama.dispatchEvent( { type: 'click', intersects: intersects, mouseEvent: event } );

			if ( intersect_entity && intersect_entity.dispatchEvent ) {

				intersect_entity.dispatchEvent( { type: 'click-entity', mouseEvent: event } );

			}

			if ( intersect && intersect.dispatchEvent ) {

				intersect.dispatchEvent( { type: 'click', mouseEvent: event } );

			}

		} else {

			this.panorama.dispatchEvent( { type: 'hover', intersects: intersects, mouseEvent: event } );

			if ( ( this.hoverObject && intersects.length > 0 && this.hoverObject !== intersect_entity )
				|| ( this.hoverObject && intersects.length === 0 ) ){

				if ( this.hoverObject.dispatchEvent ) {

					this.hoverObject.dispatchEvent( { type: 'hoverleave', mouseEvent: event } );

					// Reset reticle timer
					if ( this.options.autoReticleSelect && this.options.enableReticle ) {
						reticle = this.reticle;
						window.cancelAnimationFrame( reticle.timerId );
						reticle.target = null;
						reticle.timerId = null;
					}

				}

				this.hoverObject = undefined;

			}

			if ( intersect_entity && intersects.length > 0 ) {

				if ( this.hoverObject !== intersect_entity ) {

					this.hoverObject = intersect_entity;

					if ( this.hoverObject.dispatchEvent ) {

						this.hoverObject.dispatchEvent( { type: 'hoverenter', mouseEvent: event } );

						// Start reticle timer
						if ( this.options.autoReticleSelect && this.options.enableReticle ) {
							reticle = this.reticle;
							reticle.target = this.hoverObject;
							reticle.startTime = window.performance.now();
							reticle.timerId = window.requestAnimationFrame( this.reticleSelect.bind( this, event ) );
						}

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressEntityObject != intersect_entity ) {

					this.pressEntityObject = intersect_entity;

					if ( this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressstart-entity', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousedown' && this.pressObject != intersect ) {

					this.pressObject = intersect;

					if ( this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressstart', mouseEvent: event } );

					}

				}

				if ( this.userMouse.type === 'mousemove' || this.options.enableReticle ) {

					if ( intersect && intersect.dispatchEvent ) {

						intersect.dispatchEvent( { type: 'hover', mouseEvent: event } );

					}

					if ( this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

						this.pressEntityObject.dispatchEvent( { type: 'pressmove-entity', mouseEvent: event } );

					}

					if ( this.pressObject && this.pressObject.dispatchEvent ) {

						this.pressObject.dispatchEvent( { type: 'pressmove', mouseEvent: event } );

					}

				}

			}

			if ( !intersect_entity && this.pressEntityObject && this.pressEntityObject.dispatchEvent ) {

				this.pressEntityObject.dispatchEvent( { type: 'pressstop-entity', mouseEvent: event } );

				this.pressEntityObject = undefined;

			}

			if ( !intersect && this.pressObject && this.pressObject.dispatchEvent ) {

				this.pressObject.dispatchEvent( { type: 'pressstop', mouseEvent: event } );

				this.pressObject = undefined;

			}

		}

		// Infospot handler
		if ( intersect && intersect instanceof PANOLENS.Infospot ) {

			this.infospot = intersect;
			
			if ( type === 'click' ) {

				return true;

			}
			

		} else if ( this.infospot ) {

			this.hideInfospot();

		}

	};

	PANOLENS.Viewer.prototype.getConvertedIntersect = function ( intersects ) {

		var intersect;

		for ( var i = 0; i < intersects.length; i++ ) {

			if ( intersects[i].object && !intersects[i].object.passThrough ) {

				if ( intersects[i].object.entity && intersects[i].object.entity.passThrough ) {
					continue;
				} else if ( intersects[i].object.entity && !intersects[i].object.entity.passThrough ) {
					intersect = intersects[i].object.entity;
					break;
				} else {
					intersect = intersects[i].object;
					break;
				}

			}

		}

		return intersect;

	};

	PANOLENS.Viewer.prototype.hideInfospot = function ( intersects ) {

		if ( this.infospot ) {

			this.infospot.onHoverEnd();

			this.infospot = undefined;

		}

	};

	/**
	 * Toggle control bar
	 * @fires [PANOLENS.Viewer#control-bar-toggle]
	 */
	PANOLENS.Viewer.prototype.toggleControlBar = function () {

		/**
		 * Toggle control bar event
		 * @type {object}
		 * @event PANOLENS.Viewer#control-bar-toggle
		 */
		this.widget && this.widget.dispatchEvent( { type: 'control-bar-toggle' } );

	};

	PANOLENS.Viewer.prototype.onKeyDown = function ( event ) {

		if ( event.keyCode === 17 || event.keyIdentifier === 'Control' ) {

			this.OUTPUT_INFOSPOT = true;

		}

	};

	PANOLENS.Viewer.prototype.onKeyUp = function ( event ) {

		this.OUTPUT_INFOSPOT = false;

	};

	PANOLENS.Viewer.prototype.animate = function () {

		this.requestAnimationId = window.requestAnimationFrame( this.animate.bind( this ) );

        this.render();

	};

	/**
	 * Register mouse and touch event on container
	 */
	PANOLENS.Viewer.prototype.registerMouseAndTouchEvents = function () {

		this.container.addEventListener( 'mousedown' , 	this.HANDLER_MOUSE_DOWN, true );
		this.container.addEventListener( 'mousemove' , 	this.HANDLER_MOUSE_MOVE, true );
		this.container.addEventListener( 'mouseup'	 , 	this.HANDLER_MOUSE_UP  , true );
		this.container.addEventListener( 'touchstart', 	this.HANDLER_MOUSE_DOWN, true );
		this.container.addEventListener( 'touchend'  , 	this.HANDLER_MOUSE_UP  , true );

	};

	/**
	 * Unregister mouse and touch event on container
	 */
	PANOLENS.Viewer.prototype.unregisterMouseAndTouchEvents = function () {

		this.container.removeEventListener( 'mousedown' ,  this.HANDLER_MOUSE_DOWN, true );
		this.container.removeEventListener( 'mousemove' ,  this.HANDLER_MOUSE_MOVE, true );
		this.container.removeEventListener( 'mouseup'	,  this.HANDLER_MOUSE_UP  , true );
		this.container.removeEventListener( 'touchstart',  this.HANDLER_MOUSE_DOWN, true );
		this.container.removeEventListener( 'touchend'  ,  this.HANDLER_MOUSE_UP  , true );
	};

	PANOLENS.Viewer.prototype.reticleSelect = function ( mouseEvent ) {
		
		var reticle = this.reticle;

		if ( reticle.target && performance.now() - reticle.startTime >= this.options.dwellTime ) {

			reticle.target.dispatchEvent( { type: 'click', mouseEvent: mouseEvent } );
			

		} else if ( this.options.autoReticleSelect ){

			reticle.timerId = window.requestAnimationFrame( this.reticleSelect.bind( this, mouseEvent ) );

		}

	}

	/**
	 * Create reticle element
	 * @param  {string} type - 'left' or 'right'
	 * @return {HTMLElement} - Dom element for reticle element
	 */
	PANOLENS.Viewer.prototype.createReticle = function ( type ) {
		
		var reticle, centerX, centerY;

		centerX = this.container.clientWidth / 2;
		centerY = this.container.clientHeight / 2;

		reticle = document.createElement( 'div' );

		reticle.id = 'panolens-reticle-' + type;
		reticle.style.position = 'absolute';
		reticle.style.width = '12px';
		reticle.style.height = '12px';
		reticle.style.top = '0';
		reticle.style.left = '0';
		reticle.style.marginTop = '-6px';
		reticle.style.marginLeft = '-6px';
		reticle.style.borderRadius = '50%';
		reticle.style.border = '2px solid #1abc9c';
		reticle.style.webkitTransform =
		reticle.style.msTransform =
		reticle.style.transform = 'translate( ' + centerX + 'px, ' + centerY + 'px )';

		return reticle;

	}

	/**
	 * Add reticle element
	 */
	PANOLENS.Viewer.prototype.addReticleElement = function () {

		var reticleLeft, reticleRight, reticle, container;

		reticle = this.reticle;
		container = this.container;

		reticleLeft = this.createReticle( 'left' );
		container.appendChild( reticleLeft );
		reticle.left = reticleLeft;

		reticleRight = this.createReticle( 'right' );
		container.appendChild( reticleRight );
		reticle.right = reticleRight;

	};

	/**
	 * Remove reticle element
	 */
	PANOLENS.Viewer.prototype.removeReticleElement = function () {

		var reticle, container;

		reticle = this.reticle;
		container = this.container;

		container.removeChild( reticle.left );
		reticle.left = null;

		container.removeChild( reticle.right );
		reticle.right = null;

	};

	/**
	 * Register reticle event
	 */
	PANOLENS.Viewer.prototype.registerReticleEvent = function () {

		var scope = this;

		this.addReticleElement();
		this.addUpdateCallback( this.HANDLER_TAP );
		this.addEventListener( 'VR-toggle', function ( event ) {
			scope.updateReticleEvent( event.mode );
		} );

	};

	/**
	 * Unregister reticle event
	 */
	PANOLENS.Viewer.prototype.unregisterReticleEvent = function () {

		this.removeReticleElement();
		this.removeUpdateCallback( this.HANDLER_TAP );

	};

	/**
	 * Update reticle event
	 */
	PANOLENS.Viewer.prototype.updateReticleEvent = function ( mode ) {

		var centerX, centerY, offsetLeft, offsetRight, reticle;

		mode = mode || PANOLENS.Modes.NORMAL;

		reticle = this.reticle;

		centerX = this.container.clientWidth / 2;
		centerY = this.container.clientHeight / 2;

		offsetLeft = ( mode === PANOLENS.Modes.VR ) ? 0.5 : 1;
		offsetRight = ( mode === PANOLENS.Modes.VR ) ? 1.5 : 1;

		this.removeUpdateCallback( this.HANDLER_TAP );
		this.HANDLER_TAP = this.onTap.bind( this, { clientX: centerX, clientY: centerY } );
		this.addUpdateCallback( this.HANDLER_TAP );

		reticle.left.style.webkitTransform =
		reticle.left.style.msTransform =
		reticle.left.style.transform = 'translate( ' + centerX * offsetLeft + 'px, ' + centerY + 'px )';

		reticle.right.style.webkitTransform =
		reticle.right.style.msTransform =
		reticle.right.style.transform = 'translate( ' + centerX * offsetRight + 'px, ' + centerY + 'px )';

	};

	/**
	 * Register container and window listeners
	 */
	PANOLENS.Viewer.prototype.registerEventListeners = function () {

		// Resize Event
		window.addEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.addEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.addEventListener( 'keyup'  , this.HANDLER_KEY_UP	 , true );

	};

	/**
	 * Unregister container and window listeners
	 */
	PANOLENS.Viewer.prototype.unregisterEventListeners = function () {

		// Resize Event
		window.removeEventListener( 'resize' , this.HANDLER_WINDOW_RESIZE, true );

		// Keyboard Event
		window.removeEventListener( 'keydown', this.HANDLER_KEY_DOWN, true );
		window.removeEventListener( 'keyup'  , this.HANDLER_KEY_UP  , true );

	};

	/**
	 * Dispose all scene objects and clear cache
	 */
	PANOLENS.Viewer.prototype.dispose = function () {

		// Unregister dom event listeners
		this.unregisterEventListeners();

		// recursive disposal on 3d objects
		function recursiveDispose ( object ) {

			for ( var i = object.children.length - 1; i >= 0; i-- ) {

				recursiveDispose( object.children[i] );
				object.remove( object.children[i] );

			}

			if ( object instanceof PANOLENS.Infospot ) {

				object.dispose();

			}

			object.geometry && object.geometry.dispose();
			object.material && object.material.dispose();
		}

		recursiveDispose( this.scene );

		// dispose widget
		if ( this.widget ) {

			this.widget.dispose();
			this.widget = null;

		}

		// clear cache
		if ( THREE.Cache && THREE.Cache.enabled ) {

			THREE.Cache.clear();

		}

	};

	/**
	 * Destory viewer by disposing and stopping requestAnimationFrame
	 */
	PANOLENS.Viewer.prototype.destory = function () {

		this.dispose();
		this.render();
		window.cancelAnimationFrame( this.requestAnimationId );		

	};

} )();