(function(){

	'use strict';

	/**
	 * Video Panorama
	 * @constructor
	 * @param {string} src - Equirectangular video url
	 * @param {object} [options] - Option for video settings
	 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
	 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
	 * @param {boolean} [options.muted=false] - Mute the video or not
	 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
	 * @param {boolean} [options.playsinline=true] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
	 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
	 * @param {number} [radius=5000] - The minimum radius for this panoram
	 */
	PANOLENS.VideoPanorama = function ( src, options, radius ) {

		radius = radius || 5000;

		var geometry = new THREE.SphereGeometry( radius, 60, 40 ),
			material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

		PANOLENS.Panorama.call( this, geometry, material );

		this.src = src;
		this.options = options || {};
		this.options.playsinline = this.options.playsinline !== false ? true : false;

		this.videoElement = undefined;
		this.videoRenderObject = undefined;
		this.videoProgress = 0;

		this.isIOS = /iPhone|iPad|iPod/i.test( navigator.userAgent );
		this.isMobile = this.isIOS || /Android|BlackBerry|Opera Mini|IEMobile/i.test( navigator.userAgent );

		this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.addEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
		this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

	};

	PANOLENS.VideoPanorama.prototype = Object.create( PANOLENS.Panorama.prototype );

	PANOLENS.VideoPanorama.constructor = PANOLENS.VideoPanorama;

	/**
	 * Load video panorama
	 * @param  {string} src     - The video url
	 * @param  {object} options - Option object containing videoElement
	 * @fires  PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.load = function ( src, options ) {

		var scope = this;

		src = ( src || this.src ) || '';
		options = ( options || this.options ) || {};

		this.videoElement = options.videoElement || document.createElement( 'video' );

		this.videoElement.muted = options.muted || false;
		this.videoElement.loop = ( options.loop !== undefined ) ? options.loop : true;
		this.videoElement.autoplay = ( options.autoplay !== undefined ) ? options.autoplay : false;
		this.videoElement.crossOrigin = ( options.crossOrigin !== undefined ) ? options.crossOrigin : "anonymous";
		
		// iphone inline player
		if (options.playsinline) {
			this.videoElement.setAttribute( "playsinline", "" );
			this.videoElement.setAttribute( "webkit-playsinline", "" );
		} 

		var onloadeddata = function(){

			scope.onProgress( { loaded: 1, total: 1 } );
			scope.setVideoTexture( scope.videoElement );

			if ( scope.videoElement.autoplay ) {

				/**
				 * Viewer handler event
				 * @type {object}
				 * @property {string} method - 'updateVideoPlayButton'
				 * @property {boolean} data - Pause video or not
				 */
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

			}

			// For mobile silent autoplay
			if ( scope.isMobile ) {

				if ( scope.videoElement.autoplay && scope.videoElement.muted ) {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

				} else {

					/**
					 * Viewer handler event
					 * @type {object}
					 * @property {string} method - 'updateVideoPlayButton'
					 * @property {boolean} data - Pause video or not
					 */
					scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

				}
				
			}

			scope.onLoad();
		};

		/**
		 * Ready state of the audio/video element
		 * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
		 * 1 = HAVE_METADATA - metadata for the audio/video is ready
		 * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
		 * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
		 * 4 = HAVE_ENOUGH_DATA - enough data available to start playing
		 */
		if ( this.videoElement.readyState > 2 ) {

			onloadeddata();

		} else {

			if ( !this.videoElement.querySelectorAll('source').length || !this.videoElement.src ) {

				this.videoElement.src =  src;

			}

			this.videoElement.load();
		}

		this.videoElement.onloadeddata = onloadeddata;
		

		this.videoElement.ontimeupdate = function ( event ) {

			scope.videoProgress = this.duration >= 0 ? this.currentTime / this.duration : 0;

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'onVideoUpdate'
			 * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
			 */
			scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: scope.videoProgress } );

		};

		this.videoElement.addEventListener( 'ended', function () {
			
			if ( !scope.options.loop ) {

				scope.resetVideo();
				scope.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

			}

		}, false ); 

	};

	/**
	 * Set video texture
	 * @param {HTMLVideoElement} video  - The html5 video element
	 * @fires PANOLENS.Panorama#panolens-viewer-handler
	 */
	PANOLENS.VideoPanorama.prototype.setVideoTexture = function ( video ) {

		var videoTexture, videoRenderObject, scene;

		if ( !video ) return;

		videoTexture = new THREE.VideoTexture( video );
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;
		videoTexture.format = THREE.RGBFormat;

		videoRenderObject = {

			video : video,
			videoTexture: videoTexture

		};

		if ( this.isIOS ){

			enableInlineVideo( video );

		}

		this.updateTexture( videoTexture );

		this.videoRenderObject = videoRenderObject;
	
	};

	PANOLENS.VideoPanorama.prototype.reset = function () {

		this.videoElement = undefined;	

		PANOLENS.Panorama.prototype.reset.call( this );

	};

	/**
	 * Check if video is paused
	 * @return {boolean} - is video paused or not
	 */
	PANOLENS.VideoPanorama.prototype.isVideoPaused = function () {

		return this.videoRenderObject.video.paused;

	};

	/**
	 * Toggle video to play or pause
	 */
	PANOLENS.VideoPanorama.prototype.toggleVideo = function () {

		if ( this.videoRenderObject && this.videoRenderObject.video ) {

			if ( this.isVideoPaused() ) {

				this.videoRenderObject.video.play();


			} else {

				this.videoRenderObject.video.pause();

			}

		}

	};

	/**
	 * Set video currentTime
	 * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
	 */
	PANOLENS.VideoPanorama.prototype.setVideoCurrentTime = function ( event ) {

		if ( this.videoRenderObject && this.videoRenderObject.video && !Number.isNaN(event.percentage) && event.percentage !== 1 ) {

			this.videoRenderObject.video.currentTime = this.videoRenderObject.video.duration * event.percentage;

			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: event.percentage } );

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
	 * Resume video
	 */
	PANOLENS.VideoPanorama.prototype.resumeVideoProgress = function () {

		if ( this.videoElement.autoplay && !this.isMobile ) {

			this.playVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

		} else {

			this.pauseVideo();

			/**
			 * Viewer handler event
			 * @type {object}
			 * @property {string} method - 'updateVideoPlayButton'
			 * @property {boolean} data - Pause video or not
			 */
			this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

		}

		this.setVideoCurrentTime( { percentage: this.videoProgress } );

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
	 */
	PANOLENS.VideoPanorama.prototype.getVideoElement = function () {

		return this.videoRenderObject.video;

	};

	/**
	 * Dispose video panorama
	 */
	PANOLENS.VideoPanorama.prototype.dispose = function () {

		this.resetVideo();
		this.pauseVideo();
		
		this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
		this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
		this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
		this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

		PANOLENS.Panorama.prototype.dispose.call( this );

	};

})();