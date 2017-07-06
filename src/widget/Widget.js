(function () {
	
	/**
	 * Widget for controls
	 * @constructor
	 * @param {HTMLElement} container - A domElement where default control widget will be attached to
	 */
	PANOLENS.Widget = function ( container ) {

		THREE.EventDispatcher.call( this );

		this.DEFAULT_TRANSITION  = 'all 0.27s ease';
		this.TOUCH_ENABLED = PANOLENS.Utils.checkTouchSupported();
		this.PREVENT_EVENT_HANDLER = function ( event ) {
			event.preventDefault();
			event.stopPropagation();
		};

		this.container = container;

		this.barElement;
		this.fullscreenElement;
		this.videoElement;
		this.settingElement;

		this.mainMenu;

		this.activeMainItem;
		this.activeSubMenu;
		this.mask;

	}

	PANOLENS.Widget.prototype = Object.create( THREE.EventDispatcher.prototype );

	PANOLENS.Widget.prototype.constructor = PANOLENS.Widget;

	/**
	 * Add control bar
	 */
	PANOLENS.Widget.prototype.addControlBar = function () {

		if ( !this.container ) {

			console.warn( 'Widget container not set' ); 
			return; 
		}

		var scope = this, bar, styleTranslate, styleOpacity, gradientStyle;

		gradientStyle = 'linear-gradient(bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))';

		bar = document.createElement( 'div' );
		bar.style.width = '100%';
		bar.style.height = '44px';
		bar.style.float = 'left';
		bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = 'translateY(-100%)';
		bar.style.background = '-webkit-' + gradientStyle;
		bar.style.background = '-moz-' + gradientStyle;
		bar.style.background = '-o-' + gradientStyle;
		bar.style.background = '-ms-' + gradientStyle;
		bar.style.background = gradientStyle;
		bar.style.transition = this.DEFAULT_TRANSITION;
		bar.style.pointerEvents = 'none';
		bar.isHidden = false;
		bar.toggle = function () {
			bar.isHidden = !bar.isHidden;
			styleTranslate = bar.isHidden ? 'translateY(0)' : 'translateY(-100%)';
			styleOpacity = bar.isHidden ? 0 : 1;
			bar.style.transform = bar.style.webkitTransform = bar.style.msTransform = styleTranslate;
			bar.style.opacity = styleOpacity;
		};

		// Menu
		var menu = this.createDefaultMenu();
		this.mainMenu = this.createMainMenu( menu );
		bar.appendChild( this.mainMenu );

		// Mask
		var mask = this.createMask();
		this.mask = mask;
		this.container.appendChild( mask );

		// Dispose
		bar.dispose = function () {

			if ( scope.fullscreenElement ) {

				bar.removeChild( scope.fullscreenElement );
				scope.fullscreenElement.dispose();
				scope.fullscreenElement = null;

			}

			if ( scope.settingElement ) {

				bar.removeChild( scope.settingElement );
				scope.settingElement.dispose();
				scope.settingElement = null;

			}

			if ( scope.videoElement ) {

				bar.removeChild( scope.videoElement );
				scope.videoElement.dispose();
				scope.videoElement = null;

			}

		};

		this.container.appendChild( bar );

		// Mask events
		this.mask.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );
		this.mask.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', function ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mask.hide();
			scope.settingElement.deactivate();

		}, false );

		// Event listener
		this.addEventListener( 'control-bar-toggle', bar.toggle );

		this.barElement = bar;

	};

	/**
	 * Create default menu
	 */
	PANOLENS.Widget.prototype.createDefaultMenu = function () {

		var scope = this, handler;

		handler = function ( method, data ) {

			return function () {

				scope.dispatchEvent( { 

					type: 'panolens-viewer-handler', 
					method: method, 
					data: data 

				} ); 

			}

		};

		return [

			{ 
				title: 'Control', 
				subMenu: [ 
					{ 
						title: this.TOUCH_ENABLED ? 'Touch' : 'Mouse', 
						handler: handler( 'enableControl', PANOLENS.Controls.ORBIT )
					},
					{ 
						title: 'Sensor', 
						handler: handler( 'enableControl', PANOLENS.Controls.DEVICEORIENTATION ) 
					} 
				]
			},

			{ 
				title: 'Mode', 
				subMenu: [ 
					{ 
						title: 'Normal',
						handler: handler( 'disableEffect' )
					}, 
					{ 
						title: 'Cardboard',
						handler: handler( 'enableEffect', PANOLENS.Modes.CARDBOARD )
					},
					{ 
						title: 'Stereoscopic',
						handler: handler( 'enableEffect', PANOLENS.Modes.STEREO )
					}
				]
			}

		];

	};

	/**
	 * Add buttons on top of control bar
	 * @param {string} name - The control button name to be created
	 */
	PANOLENS.Widget.prototype.addControlButton = function ( name ) {

		var element;

		switch( name ) {

			case 'fullscreen':

				element = this.createFullscreenButton();
				this.fullscreenElement = element; 

				break;

			case 'setting':

				element = this.createSettingButton();
				this.settingElement = element;

				break;

			case 'video':

				element = this.createVideoControl();
				this.videoElement = element;

				break;

			default:

				return;

		}

		if ( !element ) {

			return;

		}

		this.barElement.appendChild( element );

	};

	PANOLENS.Widget.prototype.createMask = function () {

		var element = document.createElement( 'div' );
		element.style.position = 'absolute';
		element.style.top = 0;
		element.style.left = 0;
		element.style.width = '100%';
		element.style.height = '100%';
		element.style.background = 'transparent';
		element.style.display = 'none';

		element.show = function () {

			this.style.display = 'block';

		};

		element.hide = function () {

			this.style.display = 'none';

		};

		return element;

	};

	/**
	 * Create Setting button to toggle menu
	 */
	PANOLENS.Widget.prototype.createSettingButton = function () {

		var scope = this, item;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			scope.mainMenu.toggle();

			if ( this.activated ) {
	
				this.deactivate();

			} else {

				this.activate();

			}

		}

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataImage.Setting + '")',
				webkitTransition : this.DEFAULT_TRANSITION,
				transition : this.DEFAULT_TRANSITION

			},

			onTap: onTap

		} );

		item.activate = function () {

			this.style.transform = 'rotate3d(0,0,1,90deg)';
			this.activated = true;
			scope.mask.show();

		};

		item.deactivate = function () {

			this.style.transform = 'rotate3d(0,0,0,0)';
			this.activated = false;
			scope.mask.hide();

			if ( scope.mainMenu && scope.mainMenu.visible ) {

				scope.mainMenu.hide();
				
			}

			if ( scope.activeSubMenu && scope.activeSubMenu.visible ) {

				scope.activeSubMenu.hide();

			}

			if ( scope.mainMenu && scope.mainMenu._width ) {

				scope.mainMenu.changeSize( scope.mainMenu._width );
				scope.mainMenu.unslideAll();

			}
			
		};

		item.activated = false;

		return item;

	};

	/**
	 * Create Fullscreen button
	 * @return {HTMLSpanElement} - The dom element icon for fullscreen
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	PANOLENS.Widget.prototype.createFullscreenButton = function () {

		var scope = this, item, isFullscreen = false, tapSkipped = true, stylesheetId;

		stylesheetId = 'panolens-style-addon';

		// Don't create button if no support
		if ( !document.fullscreenEnabled       && 
			 !document.webkitFullscreenEnabled &&
			 !document.mozFullScreenEnabled    &&
			 !document.msFullscreenEnabled ) {
			return;
		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			tapSkipped = false;

			if ( !isFullscreen ) {
			    scope.container.requestFullscreen && scope.container.requestFullscreen();
			    scope.container.msRequestFullscreen && scope.container.msRequestFullscreen();
			    scope.container.mozRequestFullScreen && scope.container.mozRequestFullScreen();
			    scope.container.webkitRequestFullscreen && scope.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				isFullscreen = true;
			} else {
			    document.exitFullscreen && document.exitFullscreen();
			    document.msExitFullscreen && document.msExitFullscreen();
			    document.mozCancelFullScreen && document.mozCancelFullScreen();
			    document.webkitExitFullscreen && document.webkitExitFullscreen();
				isFullscreen = false;
			}

			this.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + PANOLENS.DataImage.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataImage.FullscreenEnter + '")';

		}

		function onFullScreenChange (e) {

			if ( tapSkipped ) {

				isFullscreen = !isFullscreen; 

				item.style.backgroundImage = ( isFullscreen ) 
				? 'url("' + PANOLENS.DataImage.FullscreenLeave + '")' 
				: 'url("' + PANOLENS.DataImage.FullscreenEnter + '")';

			}

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onWindowResize' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onWindowResize', data: false } );

			tapSkipped = true;

		}

		document.addEventListener( 'fullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'webkitfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'mozfullscreenchange', onFullScreenChange, false );
		document.addEventListener( 'MSFullscreenChange', onFullScreenChange, false );

		item = this.createCustomItem( { 

			style : { 

				backgroundImage : 'url("' + PANOLENS.DataImage.FullscreenEnter + '")' 

			},

			onTap : onTap

		} );

		// Add fullscreen stlye if not exists
		if ( !document.querySelector( stylesheetId ) ) {
			var sheet = document.createElement( 'style' );
			sheet.id = stylesheetId;
			sheet.innerHTML = ':-webkit-full-screen { width: 100% !important; height: 100% !important }';
			document.body.appendChild( sheet );
		}
		
		return item;

	};

	/**
	 * Create video control container
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 */
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

		};

		item.controlButton = this.createVideoControlButton();
		item.seekBar = this.createVideoControlSeekbar();
		
		item.appendChild( item.controlButton );
		item.appendChild( item.seekBar );

		item.dispose = function () {

			item.removeChild( item.controlButton );
			item.removeChild( item.seekBar );

			item.controlButton.dispose();
			item.controlButton = null;

			item.seekBar.dispose();
			item.seekBar = null;

		};

		this.addEventListener( 'video-control-show', item.show );
		this.addEventListener( 'video-control-hide', item.hide );

		return item;

	};

	/**
	 * Create video control button
	 * @return {HTMLSpanElement} - The dom element icon for video control
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
	PANOLENS.Widget.prototype.createVideoControlButton = function () {

		var scope = this, item;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'toggleVideoPlay' function call on PANOLENS.Viewer
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'toggleVideoPlay', data: !this.paused } );

			this.paused = !this.paused;

			item.update();

		};

		item = this.createCustomItem( { 

			style : { 

				float : 'left',
				backgroundImage : 'url("' + PANOLENS.DataImage.VideoPlay + '")'

			},

			onTap : onTap

		} );

		item.paused = true;

		item.update = function ( paused ) {

			this.paused = paused !== undefined ? paused : this.paused;

			this.style.backgroundImage = 'url("' + ( this.paused 
				? PANOLENS.DataImage.VideoPlay 
				: PANOLENS.DataImage.VideoPause ) + '")';

		};

		return item;

	};

	/**
	 * Create video seekbar
	 * @return {HTMLSpanElement} - The dom element icon for video seekbar
	 * @fires PANOLENS.Widget#panolens-viewer-handler
	 */
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

			addControlListeners();
		}

		function onVideoControlDrag ( event ) {

			var clientX;

			if( isDragging ){

				clientX = event.clientX || ( event.changedTouches && event.changedTouches[0].clientX );
				
				percentageNext = ( clientX - mouseX ) / item.clientWidth;

				percentageNext = percentageNow + percentageNext;

				percentageNext = percentageNext > 1 ? 1 : ( ( percentageNext < 0 ) ? 0 : percentageNext );

				item.setProgress ( percentageNext );

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
				 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentageNext } );

			}

		}

		function onVideoControlStop ( event ) {

			event.stopPropagation();

			isDragging = false;

			removeControlListeners();

		}

		function addControlListeners () {

			scope.container.addEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.addEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.addEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.addEventListener( 'touchend', onVideoControlStop, false );


		}

		function removeControlListeners () {

			scope.container.removeEventListener( 'mousemove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'mouseup', onVideoControlStop, false );
			scope.container.removeEventListener( 'touchmove', onVideoControlDrag, false );
			scope.container.removeEventListener( 'touchend', onVideoControlStop, false );

		}

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var percentage;

			if ( event.target === progressElementControl ) { return; }

			percentage = ( event.changedTouches && event.changedTouches.length > 0 )
				? ( event.changedTouches[0].pageX - event.target.getBoundingClientRect().left ) / this.clientWidth
				: event.offsetX / this.clientWidth;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'setVideoCurrentTime' function call on PANOLENS.Viewer
			 * @property {number} data - Percentage of current video. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'setVideoCurrentTime', data: percentage } );

			item.setProgress( event.offsetX / this.clientWidth );

		};

		function onDispose () {

			removeControlListeners();
			progressElement = null;
			progressElementControl = null;

		}

		progressElement.appendChild( progressElementControl );

		item = this.createCustomItem( {

			style : { 

				float : 'left',
				width : '30%',
				height : '4px',
				marginTop : '20px',
				backgroundColor : 'rgba(188,188,188,0.8)'

			},

			onTap : onTap,
			onDispose: onDispose

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

	/**
	 * Create menu item
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	PANOLENS.Widget.prototype.createMenuItem = function ( title ) {

		var scope = this, item = document.createElement( 'a' );
		item.textContent = title;
		item.style.display = 'block';
		item.style.padding = '10px';
		item.style.textDecoration = 'none';
		item.style.cursor = 'pointer';
		item.style.pointerEvents = 'auto';
		item.style.transition = this.DEFAULT_TRANSITION;

		item.slide = function ( right ) {

			this.style.transform = 'translateX(' + ( right ? '' : '-' ) + '100%)';

		};

		item.unslide = function () {

			this.style.transform = 'translateX(0)';

		};

		item.setIcon = function ( url ) {

			if ( this.icon ) {

				this.icon.style.backgroundImage = 'url(' + url + ')';

			}

		};

		item.setSelectionTitle = function ( title ) {

			if ( this.selection ) {

				this.selection.textContent = title;

			}

		};

		item.addSelection = function ( name ) {
			
			var selection = document.createElement( 'span' );
			selection.style.fontSize = '13px';
			selection.style.fontWeight = '300';
			selection.style.float = 'right';

			this.selection = selection;
			this.setSelectionTitle( name );
			this.appendChild( selection );
			
			return this;

		};

		item.addIcon = function ( url, left, flip ) {

			url = url || PANOLENS.DataImage.ChevronRight;
			left = left || false;
			flip = flip || false;
			
			var element = document.createElement( 'span' );
			element.style.float = left ? 'left' : 'right';
			element.style.width = '17px';
			element.style.height = '17px';
			element.style[ 'margin' + ( left ? 'Right' : 'Left' ) ] = '12px';
			element.style.backgroundSize = 'cover';

			if ( flip ) {

				element.style.transform = 'rotateZ(180deg)';

			}

			this.icon = element;
			this.setIcon( url );
			this.appendChild( element );

			return this;

		};

		item.addSubMenu = function ( title, items ) {

			this.subMenu = scope.createSubMenu( title, items );

			return this;

		};

		item.addEventListener( 'mouseenter', function () {
			
			this.style.backgroundColor = '#e0e0e0';

		}, false );

		item.addEventListener( 'mouseleave', function () {
			
			this.style.backgroundColor = '#fafafa';

		}, false );

		return item;

	};

	/**
	 * Create menu item header
	 * @param  {string} title - Title to display
	 * @return {HTMLDomElement} - An anchor tag element
	 */
	PANOLENS.Widget.prototype.createMenuItemHeader = function ( title ) {

		var header = this.createMenuItem( title );

		header.style.borderBottom = '1px solid #333';
		header.style.paddingBottom = '15px';

		return header;

	};

	/**
	 * Create main menu
	 * @param  {array} menus - Menu array list
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createMainMenu = function ( menus ) {
		
		var scope = this, menu = this.createMenu(), subMenu;

		menu._width = 200;
		menu.changeSize( menu._width );

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			var mainMenu = scope.mainMenu, subMenu = this.subMenu;

			function onNextTick () {

				mainMenu.changeSize( subMenu.clientWidth );
				subMenu.show();
				subMenu.unslideAll();

			}

			mainMenu.hide();
			mainMenu.slideAll();
			mainMenu.parentElement.appendChild( subMenu );

			scope.activeMainItem = this;
			scope.activeSubMenu = subMenu;

			window.requestAnimationFrame( onNextTick );

		};

		for ( var i = 0; i < menus.length; i++ ) {

			var item = menu.addItem( menus[ i ].title );

			item.style.paddingLeft = '20px';

			item.addIcon()
				.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( menus[ i ].subMenu && menus[ i ].subMenu.length > 0 ) {

				var title = menus[ i ].subMenu[ 0 ].title;

				item.addSelection( title )
					.addSubMenu( menus[ i ].title, menus[ i ].subMenu );

			}

		}

		return menu;

	};

	/**
	 * Create sub menu
	 * @param {string} title - Sub menu title
	 * @param {array} items - Item array list
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createSubMenu = function ( title, items ) {

		var scope = this, menu, subMenu = this.createMenu();

		subMenu.items = items;
		subMenu.activeItem;

		function onTap ( event ) {

			event.preventDefault();
			event.stopPropagation();

			menu = scope.mainMenu;
			menu.changeSize( menu._width );
			menu.unslideAll();
			menu.show();
			subMenu.slideAll( true );
			subMenu.hide();

			if ( this.type !== 'header' ) {

				subMenu.setActiveItem( this );
				scope.activeMainItem.setSelectionTitle( this.textContent );

				this.handler && this.handler();

			}

		}

		subMenu.addHeader( title ).addIcon( undefined, true, true ).addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

		for ( var i = 0; i < items.length; i++ ) {

			var item = subMenu.addItem( items[ i ].title );

			item.style.fontWeight = 300;
			item.handler = items[ i ].handler;
			item.addIcon( ' ', true );
			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', onTap, false );

			if ( !subMenu.activeItem ) {

				subMenu.setActiveItem( item );

			}

		}

		subMenu.slideAll( true );

		return subMenu;
		
	};

	/**
	 * Create general menu
	 * @return {HTMLDomElement} - A span element
	 */
	PANOLENS.Widget.prototype.createMenu = function () {

		var scope = this, menu = document.createElement( 'span' ), style;

		style = menu.style;

		style.padding = '5px 0';
		style.position = 'fixed';
		style.bottom = '100%';
		style.right = '14px';
		style.backgroundColor = '#fafafa';
		style.fontFamily = 'Helvetica Neue';
		style.fontSize = '14px';
		style.visibility = 'hidden';
		style.opacity = 0;
		style.boxShadow = '0 0 12pt rgba(0,0,0,0.25)';
  		style.borderRadius = '2px';
		style.overflow = 'hidden';
		style.willChange = 'width, height, opacity';
		style.pointerEvents = 'auto';
		style.transition = this.DEFAULT_TRANSITION;

		menu.visible = false;

		menu.changeSize = function ( width, height ) {

			if ( width ) {

				this.style.width = width + 'px';

			}

			if ( height ) {

				this.style.height = height + 'px';

			}

		};

		menu.show = function () {

			this.style.opacity = 1;
			this.style.visibility = 'visible';
			this.visible = true;

		};

		menu.hide = function () {

			this.style.opacity = 0;
			this.style.visibility = 'hidden';
			this.visible = false;

		};

		menu.toggle = function () {

			if ( this.visible ) {

				this.hide();

			} else {

				this.show();

			}

		};

		menu.slideAll = function ( right ) {

			for ( var i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].slide ) {

					menu.children[ i ].slide( right );

				}

			}

		};

		menu.unslideAll = function () {

			for ( var i = 0; i < menu.children.length; i++ ){

				if ( menu.children[ i ].unslide ) {

					menu.children[ i ].unslide();

				}

			}

		};

		menu.addHeader = function ( title ) {

			var header = scope.createMenuItemHeader( title );
			header.type = 'header';

			this.appendChild( header );

			return header;

		};

		menu.addItem = function ( title ) {

			var item = scope.createMenuItem( title );
			item.type = 'item';

			this.appendChild( item );

			return item;

		};

		menu.setActiveItem = function ( item ) {

			if ( this.activeItem ) {

				this.activeItem.setIcon( ' ' );

			}

			item.setIcon( PANOLENS.DataImage.Check );

			this.activeItem = item;

		};

		menu.addEventListener( 'mousemove', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mouseup', this.PREVENT_EVENT_HANDLER, true );
		menu.addEventListener( 'mousedown', this.PREVENT_EVENT_HANDLER, true );

		return menu;

	};

	/**
	 * Create custom item element
	 * @return {HTMLSpanElement} - The dom element icon
	 */
	PANOLENS.Widget.prototype.createCustomItem = function ( options ) {

		options = options || {};

		var scope = this,
			item = options.element || document.createElement( 'span' );

		item.style.cursor = 'pointer';
		item.style.float = 'right';
		item.style.width = '44px';
		item.style.height = '100%';
		item.style.backgroundSize = '60%';
		item.style.backgroundRepeat = 'no-repeat';
		item.style.backgroundPosition = 'center';
		item.style.webkitUserSelect = 
		item.style.MozUserSelect = 
		item.style.userSelect = 'none';
		item.style.position = 'relative';
		item.style.pointerEvents = 'auto';

		// White glow on icon
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchstart' : 'mouseenter', function() {
			item.style.filter = 
			item.style.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
		});
		item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'mouseleave', function() {
			item.style.filter = 
			item.style.webkitFilter = '';
		});

		item = this.mergeStyleOptions( item, options.style );

		if ( options.onTap ) {

			item.addEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

		}

		item.dispose = function () {

			item.removeEventListener( scope.TOUCH_ENABLED ? 'touchend' : 'click', options.onTap, false );

			options.onDispose && options.onDispose();

		};
		
		return item;

	};

	/**
	 * Merge item css style
	 * @param  {HTMLDOMElement} element - The element to be merged with style
	 * @param  {object} options - The style options
	 * @return {HTMLDOMElement} - The same element with merged styles
	 */
	PANOLENS.Widget.prototype.mergeStyleOptions = function ( element, options ) {

		options = options || {};

		for ( var property in options ){

			if ( options.hasOwnProperty( property ) ) {

				element.style[ property ] = options[ property ];

			}

		}

		return element;

	};

	/**
	 * Dispose widgets by detaching dom elements from container
	 */
	PANOLENS.Widget.prototype.dispose = function () {

		if ( this.barElement ) {
			this.container.removeChild( this.barElement );
			this.barElement.dispose();
			this.barElement = null;

		}

	};

})();