(function(){

	'use strict';

	/**
	 * Video Panorama
	 * @constructor
	 * @param {string} src - Equirectangular video url
	 * @param {object} [options] - Option for video settings
	 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
	 * @param {HTMLCanvasElement} [options.videoCanvas] - HTML5 canvas element for drawing the video
	 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
	 * @param {boolean} [options.muted=false] - Mute the video or not
	 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
	 * @param {boolean} [options.playsinline=false] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
	 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	PANOLENS.VideoPanorama = function ( src, options, radius ) {

		radius = radius || 5000;

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = src;
		this.options = options;

		this.videoElement = undefined;
		this.videoCanvas = undefined;
		this.videoRenderObject = undefined;

		this.videoFramerate = 30;

		function isIOS10 () {
			var ua = navigator.userAgent, tem, M = ua.match( /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i ) || [];

			M = M[ 2 ] ? [ M[ 1 ], M[ 2 ] ] : [ navigator.appName, navigator.appVersion, '-?' ];
			if ( ( tem = ua.match( /version\/(\d+)/i ) ) !== null ) {
				M.splice( 1, 1, tem[ 1 ] );
			}
			return ( M[ 0 ] === "Safari" ? parseInt( M[ 1 ] ) >= 10 : false );
		}

		this.isIOS10 = isIOS10();
		this.isIOS = /iPhone|iPad|iPod/i.test( navigator.userAgent );
		this.isMobile = this.isIOS || /Android|BlackBerry|Opera Mini|IEMobile/i.test( navigator.userAgent );

		this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.addEventListener( 'leave', this.resetVideo.bind( this ) );
		this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	};

	PANOLENS.VideoPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.VideoPanorama.constructor = PANOLENS.VideoPanorama;

	/**
	 * [load description]
	 * @param  {string} src     - The video url
	 * @param  {object} options - Option object containing videoElement and videoCanvas
	 * @fires  PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.load = function ( src, options ) {

		var scope = this;

		src = ( src || this.src ) || '';
		options = ( options || this.options ) || {};

		this.videoElement = options.videoElement || document.createElement( 'video' );
		this.videoCanvas = options.videoCanvas || document.createElement( 'canvas' );
		
		this.videoElement.muted = options.muted || false;
		this.videoElement.loop = ( options.loop !== undefined ) ? options.loop : true;
		this.videoElement.autoplay = ( options.autoplay !== undefined ) ? options.autoplay : false;
		this.videoElement.crossOrigin = ( options.crossOrigin !== undefined ) ? options.crossOrigin : "anonymous";
		if (options.playsinline) this.videoElement.setAttribute( "playsinline", "" );
		this.videoElement.src =  src;
		this.videoElement.load();

		this.videoElement.onloadeddata = function(){

			scope.setVideoTexture( scope.videoElement, scope.videoCanvas );

			scope.onLoad();

			if ( scope.videoElement.autoplay && !scope.isMobile ) {

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'updateVideoPlayButton'
				 * @property {boolean} data - Pause video or not
				 * @property {boolean} [ignoreUpdate] - Ignore passiveRendering update
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false, ignoreUpdate: true } );

			}

		};

		this.videoElement.ontimeupdate = function ( event ) {

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onVideoUpdate'
			 * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.currentTime / this.duration } );

		};

	};

	/**
	 * Set video texture
	 * @param {HTMLVideoElement} video  - The html5 video element
	 * @param {HTMLCanvasElement} canvas - The canvas for video to be drawn on
	 * @fires PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.setVideoTexture = function ( video, canvas ) {

		var videoTexture, videoRenderObject, videoContext, scene, updateCallback;

		if ( !video || !canvas ) return;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		videoContext = canvas.getContext('2d');

		videoTexture = new THREE.Texture( canvas );
		videoTexture.generateMipmaps = false;
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;

		videoRenderObject = {

			video : video,
			videoContext : videoContext,
			videoTexture: videoTexture,
			target : this

		};

		if ( this.isIOS && !this.isIOS10 ){

			makeVideoPlayableInline( video, /* hasAudio */ !this.options.muted );

		}

		updateCallback = function () {

			if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA && !this.video.paused ) {

				this.videoContext.drawImage( this.video, 0, 0 );
				this.videoTexture.needsUpdate = true;

			}

		};

		// Draw the first frame
		videoContext.drawImage( video, 0, 0 );
		videoTexture.needsUpdate = true;

		this.updateTexture( videoTexture );

		this.videoRenderObject = videoRenderObject;

		// Notify Viewer to render object
		/**
		 * Viewer handler event
		 * @type {object}
		 * @event PANOLENS.Panorama#panolens-viewer-handler
		 * @property {string} method - 'addUpdateCallback'
		 * @property {*} data - The callback function to update video
		 */
		this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'addUpdateCallback', data: updateCallback.bind( videoRenderObject ) } );
		
	};

	PANOLENS.VideoPanorama.prototype.reset = function () {

		this.videoElement = undefined;

		this.videoCanvas = undefined;	

		PANOLENS.Panorama.prototype.reset.call( this );

	};

	/**
	 * Check if video is paused
	 * @return {boolean} - is video paused or not
	 */
	PANOLENS.VideoPanorama.prototype.isVideoPaused = function () {

		return ( this.isIOS ) 
			? this.videoRenderObject.video.pano_paused 
			: this.videoRenderObject.video.paused;

	};

	/**
	 * Toggle video to play or pause
	 */
	PANOLENS.VideoPanorama.prototype.toggleVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			if ( this.isVideoPaused() ) {

				this.videoRenderObject.video.play();

				this.dispatchEvent( { type: 'play' } );

			} else {

				this.videoRenderObject.video.pause();

				this.dispatchEvent( { type: 'pause' } );

			}

		}

	};

	/**
	 * Set video currentTime
	 * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
	 */
	PANOLENS.VideoPanorama.prototype.setVideoCurrentTime = function ( event ) {

		if ( this.videoRenderObject && this.videoRenderObject.video && event.percentage !== 1 ) {

			this.videoRenderObject.video.currentTime = this.videoRenderObject.video.duration * event.percentage;

		}

	};

	/**
	 * Play video
	 */
	PANOLENS.VideoPanorama.prototype.playVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && this.isVideoPaused() ) {

			this.videoRenderObject.video.play();

		}

		/**
		 * Play event
		 * @type {object}
		 * @event 'play'
		 * */
		this.dispatchEvent( { type: 'play' } );

	};

	/**
	 * Pause video
	 */
	PANOLENS.VideoPanorama.prototype.pauseVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && !this.isVideoPaused() ) {

			this.videoRenderObject.video.pause();

		}

		/**
		 * Pause event
		 * @type {object}
		 * @event 'pause'
		 * */
		this.dispatchEvent( { type: 'pause' } );

	};

	/**
	 * Reset video at stating point
	 */
	PANOLENS.VideoPanorama.prototype.resetVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			this.setVideoCurrentTime( { percentage: 0 } );

		}

	};

	/**
	* Check if video is muted
	* @return {boolean} - is video muted or not
	*/
	PANOLENS.VideoPanorama.prototype.isVideoMuted = function () {

		return this.videoRenderObject.video.muted;

	};

	/**
	 * Mute video
	 */
	PANOLENS.VideoPanorama.prototype.muteVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && !this.isVideoMuted() ) {

			this.videoRenderObject.video.muted = true;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	};

	/**
	 * Unmute video
	 */
	PANOLENS.VideoPanorama.prototype.unmuteVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video && this.isVideoMuted() ) {

			this.videoRenderObject.video.muted = false;

		}

		this.dispatchEvent( { type: 'volumechange' } );

	};

	/**
	 * Returns the video element
	 * */
	PANOLENS.VideoPanorama.prototype.getVideoElement = function () {
		return this.videoRenderObject.video;
	}
})();