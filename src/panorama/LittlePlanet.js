( function () {

	/**
	 * Little Planet
	 * @constructor
	 * @param {string} type 		- Type of little planet basic class
	 * @param {string} source 		- URL for the image source
	 * @param {number} [size=10000] - Size of plane geometry
	 * @param {number} [ratio=0.5]  - Ratio of plane geometry's height against width
	 */
	PANOLENS.LittlePlanet = function ( type, source, size, ratio ) {

		type = type || 'image';

		type === 'image' && PANOLENS.ImagePanorama.call( this, source, size );

		this.size = size || 10000;
		this.ratio = ratio || 0.5;
		this.EPS = 0.000001;
		this.frameId;

		this.geometry = this.createGeometry();
		this.material = this.createMaterial( this.size );

		this.dragging = false;
		this.userMouse = new THREE.Vector2();

		this.quatA = new THREE.Quaternion();
		this.quatB = new THREE.Quaternion();
		this.quatCur = new THREE.Quaternion();
		this.quatSlerp = new THREE.Quaternion();

		this.vectorX = new THREE.Vector3( 1, 0, 0 );
		this.vectorY = new THREE.Vector3( 0, 1, 0 );

		this.addEventListener( 'window-resize', this.onWindowResize );

	};

	PANOLENS.LittlePlanet.prototype = Object.create( PANOLENS.ImagePanorama.prototype );

	PANOLENS.LittlePlanet.prototype.constructor = PANOLENS.LittlePlanet;

	PANOLENS.LittlePlanet.prototype.createGeometry = function () {

		return new THREE.PlaneGeometry( this.size, this.size * this.ratio );

	};

	PANOLENS.LittlePlanet.prototype.createMaterial = function ( size ) {

		var uniforms = PANOLENS.StereographicShader.uniforms;
		uniforms.zoom.value = size;

		return new THREE.ShaderMaterial( {

			uniforms: uniforms,
			vertexShader: PANOLENS.StereographicShader.vertexShader,
			fragmentShader: PANOLENS.StereographicShader.fragmentShader

		} );
		
	};

	PANOLENS.LittlePlanet.prototype.registerMouseEvents = function () {

		this.container.addEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
		this.container.addEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
		this.container.addEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
		this.container.addEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
		this.container.addEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
		this.container.addEventListener( 'touchend', this.onMouseUp.bind( this ), false );
		this.container.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
		this.container.addEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
		this.container.addEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
	};

	PANOLENS.LittlePlanet.prototype.unregisterMouseEvents = function () {

		this.container.removeEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'touchstart', this.onMouseDown.bind( this ), false );
		this.container.removeEventListener( 'touchmove', this.onMouseMove.bind( this ), false );
		this.container.removeEventListener( 'touchend', this.onMouseUp.bind( this ), false );
		this.container.removeEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'DOMMouseScroll', this.onMouseWheel.bind( this ), false );
		this.container.removeEventListener( 'contextmenu', this.onContextMenu.bind( this ), false );
		
	};

	PANOLENS.LittlePlanet.prototype.onMouseDown = function ( event ) {

		var x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
		var y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

		var inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				this.dragging = true;
				this.userMouse.set( x, y );

				break;

			case 2:

				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );
				this.userMouse.pinchDistance = distance;

				break;

			default:

				break;

		}

		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.onMouseMove = function ( event ) {

		var x = ( event.clientX >= 0 ) ? event.clientX : event.touches[ 0 ].clientX;
		var y = ( event.clientY >= 0 ) ? event.clientY : event.touches[ 0 ].clientY;

		var inputCount = ( event.touches && event.touches.length ) || 1 ;

		switch ( inputCount ) {

			case 1:

				var angleX = THREE.Math.degToRad( x - this.userMouse.x ) * 0.4;
				var angleY = THREE.Math.degToRad( y - this.userMouse.y ) * 0.4;

				if ( this.dragging ) {
					this.quatA.setFromAxisAngle( this.vectorY, angleX );
					this.quatB.setFromAxisAngle( this.vectorX, angleY );
					this.quatCur.multiply( this.quatA ).multiply( this.quatB );
					this.userMouse.set( x, y );
				}

				break;

			case 2:

				var uniforms = this.material.uniforms;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );

				this.addZoomDelta( this.userMouse.pinchDistance - distance );

				break;

			default:

				break;

		}

	};

	PANOLENS.LittlePlanet.prototype.onMouseUp = function ( event ) {

		this.dragging = false;

	};

	PANOLENS.LittlePlanet.prototype.onMouseWheel = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail !== undefined ) { // Firefox

			delta = - event.detail;

		}

		this.addZoomDelta( delta );
		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.addZoomDelta = function ( delta ) {

		var uniforms = this.material.uniforms;
		var lowerBound = this.size * 0.1;
		var upperBound = this.size * 10;

		uniforms.zoom.value += delta;

		if ( uniforms.zoom.value <= lowerBound ) {

			uniforms.zoom.value = lowerBound;

		} else if ( uniforms.zoom.value >= upperBound ) {

			uniforms.zoom.value = upperBound;

		}

	};

	PANOLENS.LittlePlanet.prototype.onUpdateCallback = function () {

		this.frameId = window.requestAnimationFrame( this.onUpdateCallback.bind( this ) );
		
		this.quatSlerp.slerp( this.quatCur, 0.1 );
		this.material.uniforms.transform.value.makeRotationFromQuaternion( this.quatSlerp );
		
		if ( !this.dragging && 1.0 - this.quatSlerp.clone().dot( this.quatCur ) < this.EPS ) {
			
			window.cancelAnimationFrame( this.frameId );

		}

	};

	PANOLENS.LittlePlanet.prototype.reset = function () {

		this.quatCur.set( 0, 0, 0, 1 );
		this.quatSlerp.set( 0, 0, 0, 1 );
		this.onUpdateCallback();

	};

	PANOLENS.LittlePlanet.prototype.onLoad = function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

		this.registerMouseEvents();
		this.onUpdateCallback();
		
		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' } );
		
	};

	PANOLENS.LittlePlanet.prototype.onLeave = function () {

		this.unregisterMouseEvents();

		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl', data: PANOLENS.Controls.ORBIT } );

		window.cancelAnimationFrame( this.frameId );

		PANOLENS.Panorama.prototype.onLeave.call( this );
		
	};

	PANOLENS.LittlePlanet.prototype.onWindowResize = function () {

		this.material.uniforms.resolution.value = this.container.clientWidth / this.container.clientHeight;

	};

	PANOLENS.LittlePlanet.prototype.onContextMenu = function () {

		this.dragging = false;

	};

})();