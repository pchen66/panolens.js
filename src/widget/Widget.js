(function () {
	
	/**
	 * Widget for controls
	 * @constructor
	 * @param {HTMLElement} container - A domElement where default control widget will be attached to
	 */
	PANOLENS.Widget = function ( container ) {

		THREE.EventDispatcher.call( this );

		this.container = container;

	}

	PANOLENS.Widget.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Widget.prototype.constructor = PANOLENS.Widget;

	PANOLENS.Widget.prototype.addDefaultControlBar = function () {

		if ( !this.container ) {

			console.warn( 'Widget container not set' ); 
			return; 
		}

		var scope = this, bar;

		bar = document.createElement( 'div' );
		bar.style.width = '100%';
		bar.style.height = '44px';
		bar.style.position = 'fixed';
		bar.style.bottom = '0';
		bar.style.background = 'rgba( 0, 0, 0, 0.3 )';
		bar.style.transition = 'all 0.5s ease';
		bar.toggle = function () {

			bar.style.transform = ( bar.style.transform !== 'translateY(100%)' ) ? 'translateY(100%)' : 'translateY(0)';

		};

		// Add Control Items
		bar.appendChild( this.createFullscreenButton() );
		bar.appendChild( this.createCameraControlButton() );
		bar.appendChild( this.createVRButton() );
		bar.appendChild( this.createVideoControl() );

		this.container.appendChild( bar );

		// Event listener
		this.addEventListener( 'control-bar-toggle', bar.toggle );

		return bar;

	};

	PANOLENS.Widget.prototype.createVRButton = function () {

		var scope = this, item;

		function onTap () {

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVR' } );

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataIcon.Cardboard + '")' 

			},

			onTap : onTap

		} );

		return item;

	}

	PANOLENS.Widget.prototype.createFullscreenButton = function () {

		var scope = this, item;

		function onTap () {

			var fullscreenElement;

			if (!document.fullscreenElement &&
			    !document.mozFullScreenElement &&
			    !document.webkitFullscreenElement &&
			    !document.msFullscreenElement ) {
			  if (document.documentElement.requestFullscreen) {
			    document.documentElement.requestFullscreen();
			  } else if (document.documentElement.msRequestFullscreen) {
			    document.documentElement.msRequestFullscreen();
			  } else if (document.documentElement.mozRequestFullScreen) {
			    document.documentElement.mozRequestFullScreen();
			  } else if (document.documentElement.webkitRequestFullscreen) {
			    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			  }
			} else {
			  if (document.exitFullscreen) {
			    document.exitFullscreen();
			  } else if (document.msExitFullscreen) {
			    document.msExitFullscreen();
			  } else if (document.mozCancelFullScreen) {
			    document.mozCancelFullScreen();
			  } else if (document.webkitExitFullscreen) {
			    document.webkitExitFullscreen();
			  }
			}

			fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

			this.style.backgroundImage = ( fullscreenElement !== null ) 
				? 'url("' + PANOLENS.DataIcon.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataIcon.FullscreenEnter + '")';

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataIcon.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

		return item;

	};

	PANOLENS.Widget.prototype.createCameraControlButton = function () {

		var scope = this, item;

		function onTap(){

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleNextControl' } );

			this.controlName = ( this.controlName === 'orbit' ) ? 'device-orientation' : 'orbit';

			this.style.backgroundImage = 'url("' + ( this.controlName === 'orbit' 
				? PANOLENS.DataIcon.Gyro 
				: PANOLENS.DataIcon.Orbit ) + '")';

		}

		item = this.createCustomItem( {

			style: {

				backgroundImage: 'url("' + PANOLENS.DataIcon.Gyro + '")'

			},

			onTap : onTap

		} );

		item.controlName = 'orbit';

		return item;

	};

	PANOLENS.Widget.prototype.createVideoControl = function () {

		var item;

		item = document.createElement( 'span' );
		item.style.display = 'none';
		item.show = function () { 

			item.style.display = '';

		};

		item.hide = function () { 

			item.style.display = 'none';
			item.controlButton.paused = true;
			item.controlButton.update();
			item.seekBar.setProgress( 0 );
		};

		item.controlButton = this.createVideoControlButton();
		item.seekBar = this.createVideoControlSeekbar();
		
		item.appendChild( item.controlButton );
		item.appendChild( item.seekBar );

		this.addEventListener( 'video-control-show', item.show );
		this.addEventListener( 'video-control-hide', item.hide )

		return item;

	};

	PANOLENS.Widget.prototype.createVideoControlButton = function () {

		var scope = this, item;

		function onTap () {

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay' } );

			this.paused = !this.paused;

			item.update();

		};

		item = this.createCustomItem( { 

			style : { 

				float : 'left',
				backgroundImage : 'url("' + PANOLENS.DataIcon.VideoPlay + '")'

			},

			onTap : onTap

		} );

		item.paused = true;

		item.update = function () {

			this.style.backgroundImage = 'url("' + ( this.paused 
				? PANOLENS.DataIcon.VideoPlay 
				: PANOLENS.DataIcon.VideoPause ) + '")';

		};

		return item;

	};

	PANOLENS.Widget.prototype.createVideoControlSeekbar = function () {

		var scope = this, item, progressElement, progressElementControl,
			isDragging = false, mouseX, percentageNow, percentageNext;

		progressElement = document.createElement( 'div' );
		progressElement.style.width = '0%';
		progressElement.style.height = '100%';
		progressElement.style.backgroundColor = '#fff';

		progressElementControl = document.createElement( 'div' );
		progressElementControl.style.float = 'right';
		progressElementControl.style.width = '14px';
		progressElementControl.style.height = '14px';
		progressElementControl.style.transform = 'translate(7px, -5px)';
		progressElementControl.style.borderRadius = '50%';
		progressElementControl.style.backgroundColor = '#ddd';

		progressElementControl.addEventListener( 'mousedown', onMouseDown, false );
		progressElementControl.addEventListener( 'touchstart', onMouseDown, false );

		function onMouseDown ( event ) {

			event.stopPropagation();
			
			isDragging = true;
			
			mouseX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );

			percentageNow = parseInt( progressElement.style.width ) / 100;

			scope.container.addEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.addEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.addEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.addEventListener( 'touchend', onVideoControlStop, false );

		}

		function onVideoControlDrag ( event ) {

			var clientX;

			if( isDragging ){

				clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
				
				percentageNext = ( clientX - mouseX ) / item.clientWidth;

				percentageNext = percentageNow + percentageNext;

				percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

				item.setProgress ( percentageNext );

				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

			}

		}

		function onVideoControlStop ( event ) {

			event.stopPropagation();

			isDragging = false;

			scope.container.removeEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.removeEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'touchend', onVideoControlStop, false );

		}

		function onTap ( event ) {

			var percentage;

			if ( event.target === progressElementControl ) { return; }

			percentage = ( event.changedTouches && event.changedTouches.length > 0 )
				? ( event.changedTouches[0].pageX - event.target.getBoundingClientRect().left ) / this.clientWidth
				: event.offsetX / this.clientWidth;

			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

			item.setProgress( event.offsetX / this.clientWidth );

		};

		progressElement.appendChild( progressElementControl );

		item = this.createCustomItem( {

			style : { 

				float : 'left',
				width : '30%',
				height : '4px',
				marginTop : '20px',
				backgroundColor : 'rgba(188,188,188,0.8)'

			},

			onTap : onTap

		} );

		item.appendChild( progressElement );

		item.setProgress = function( percentage ) {

			progressElement.style.width = percentage * 100 + '%';

		};		

		this.addEventListener( 'video-update', function ( event ) { 

			item.setProgress( event.percentage ); 

		} );

		return item;

	};

	PANOLENS.Widget.prototype.createCustomItem = function ( options ) {

		options = options || {};

		var item = options.element || document.createElement( 'span' );

		item.style.cursor = 'pointer';
		item.style.float = 'right';
		item.style.width = '44px';
		item.style.height = '100%';
		item.style.backgroundSize = '60%';
		item.style.backgroundRepeat = 'no-repeat';
		item.style.backgroundPosition = 'center';

		item.addEventListener('mouseenter', function(e) {
			item.style.filter = item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
		});
		item.addEventListener('mouseleave', function(e) {
			item.style.filter = item.style.webkitFilter = '';
		});

		item = this.mergeStyleOptions( item, options.style );

		if ( options.onTap ) {
			[ 'click', 'touchend' ].forEach( function( event ) {
				item.addEventListener( event, options.onTap, false );
			} );
		}
		
		return item;

	};

	PANOLENS.Widget.prototype.mergeStyleOptions = function ( element, options ) {

		options = options || {};

		for ( var property in options ){

			if ( options.hasOwnProperty( property ) && element.style.hasOwnProperty( property ) ) {

				element.style[ property ] = options[ property ];

			}

		}

		return element;

	};

})();