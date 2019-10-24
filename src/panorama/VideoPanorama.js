import { Panorama } from './Panorama';
import * as THREE from 'three';

/**
 * @classdesc Video Panorama
 * @constructor
 * @param {string} src - Equirectangular video url
 * @param {object} [options] - Option for video settings
 * @param {HTMLElement} [options.videoElement] - HTML5 video element contains the video
 * @param {boolean} [options.loop=true] - Specify if the video should loop in the end
 * @param {boolean} [options.muted=true] - Mute the video or not. Need to be true in order to autoplay on some browsers
 * @param {boolean} [options.autoplay=false] - Specify if the video should auto play
 * @param {boolean} [options.playsinline=true] - Specify if video should play inline for iOS. If you want it to auto play inline, set both autoplay and muted options to true
 * @param {string} [options.crossOrigin="anonymous"] - Sets the cross-origin attribute for the video, which allows for cross-origin videos in some browsers (Firefox, Chrome). Set to either "anonymous" or "use-credentials".
 * @param {number} [radius=5000] - The minimum radius for this panoram
 */
function VideoPanorama ( src, options = {} ) {

    const radius = 5000;
    const geometry = new THREE.SphereBufferGeometry( radius, 60, 40 );
    const material = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } );

    Panorama.call( this, geometry, material );

    this.src = src;

    this.options = {

        videoElement: document.createElement( 'video' ),
        loop: true,
        muted: true,
        autoplay: false,
        playsinline: true,
        crossOrigin: 'anonymous'

    };

    Object.assign( this.options, options );

    this.videoElement = this.options.videoElement;
    this.videoProgress = 0;
    this.radius = radius;

    this.addEventListener( 'leave', this.pauseVideo.bind( this ) );
    this.addEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
    this.addEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
    this.addEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

};

VideoPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: VideoPanorama,

    isMobile: function () {

        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})( window.navigator.userAgent || window.navigator.vendor || window.opera );
        return check;

    },

    /**
     * Load video panorama
     * @memberOf VideoPanorama
     * @instance
     * @fires  Panorama#panolens-viewer-handler
     */
    load: function () {

        const { muted, loop, autoplay, playsinline, crossOrigin } = this.options;
        const video = this.videoElement;
        const material = this.material;
        const onProgress = this.onProgress.bind( this );
        const onLoad = this.onLoad.bind( this );

        video.loop = loop;
        video.autoplay = autoplay;
        video.playsinline = playsinline;
        video.crossOrigin = crossOrigin;
        video.muted = muted;
		
        if ( playsinline ) {

            video.setAttribute( 'playsinline', '' );
            video.setAttribute( 'webkit-playsinline', '' );

        } 

        const onloadeddata = function() {

            this.setVideoTexture( video );

            if ( autoplay ) {

                /**
                 * Viewer handler event
                 * @type {object}
                 * @property {string} method - 'updateVideoPlayButton'
                 * @property {boolean} data - Pause video or not
                 */
                this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

            }

            // For mobile silent autoplay
            if ( this.isMobile() ) {

                video.pause();

                if ( autoplay && muted ) {

                    /**
                     * Viewer handler event
                     * @type {object}
                     * @property {string} method - 'updateVideoPlayButton'
                     * @property {boolean} data - Pause video or not
                     */
                    this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: false } );

                } else {

                    /**
                     * Viewer handler event
                     * @type {object}
                     * @property {string} method - 'updateVideoPlayButton'
                     * @property {boolean} data - Pause video or not
                     */
                    this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

                }
				
            }

            const loaded = () => {

                // Fix for threejs r89 delayed update
                material.map.needsUpdate = true;

                onProgress( { loaded: 1, total: 1 } );
                onLoad();

            };

            window.requestAnimationFrame( loaded );
			
        };

        /**
         * Ready state of the audio/video element
         * 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
         * 1 = HAVE_METADATA - metadata for the audio/video is ready
         * 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
         * 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
         * 4 = HAVE_ENOUGH_DATA - enough data available to start playing
         */
        if ( video.readyState > 2 ) {

            onloadeddata.call( this );

        } else {

            if ( video.querySelectorAll( 'source' ).length === 0 ) {

                const source = document.createElement( 'source' );
                source.src = this.src;
                video.appendChild( source );

            }

            video.load();
        }

        video.addEventListener( 'loadeddata', onloadeddata.bind( this ) );
		
        video.addEventListener( 'timeupdate', function () {

            this.videoProgress = video.duration >= 0 ? video.currentTime / video.duration : 0;

            /**
             * Viewer handler event
             * @type {object}
             * @property {string} method - 'onVideoUpdate'
             * @property {number} data - The percentage of video progress. Range from 0.0 to 1.0
             */
            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: this.videoProgress } );

        }.bind( this ) );

        video.addEventListener( 'ended', function () {
			
            if ( !loop ) {

                this.resetVideo();
                this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'updateVideoPlayButton', data: true } );

            }

        }.bind( this ), false ); 

    },

    /**
     * Set video texture
     * @memberOf VideoPanorama
     * @instance
     * @param {HTMLVideoElement} video  - The html5 video element
     * @fires Panorama#panolens-viewer-handler
     */
    setVideoTexture: function ( video ) {

        if ( !video ) return;

        const videoTexture = new THREE.VideoTexture( video );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        this.updateTexture( videoTexture );
	
    },

    /**
     * Reset
     * @memberOf VideoPanorama
     * @instance
     */
    reset: function () {

        this.videoElement = undefined;	

        Panorama.prototype.reset.call( this );

    },

    /**
     * Check if video is paused
     * @memberOf VideoPanorama
     * @instance
     * @return {boolean} - is video paused or not
     */
    isVideoPaused: function () {

        return this.videoElement.paused;

    },

    /**
     * Toggle video to play or pause
     * @memberOf VideoPanorama
     * @instance
     */
    toggleVideo: function () {

        const video = this.videoElement;

        if ( !video ) { return; }

        video[ video.paused ? 'play' : 'pause' ]();

    },

    /**
     * Set video currentTime
     * @memberOf VideoPanorama
     * @instance
     * @param {object} event - Event contains percentage. Range from 0.0 to 1.0
     */
    setVideoCurrentTime: function ( { percentage } ) {

        const video = this.videoElement;

        if ( video && !Number.isNaN( percentage ) && percentage !== 1 ) {

            video.currentTime = video.duration * percentage;

            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'onVideoUpdate', data: percentage } );

        }

    },

    /**
     * Play video
     * @memberOf VideoPanorama
     * @instance
     * @fires VideoPanorama#play
     * @fires VideoPanorama#play-error
     */
    playVideo: function () {

        const video = this.videoElement;
        const playVideo = this.playVideo.bind( this );
        const dispatchEvent = this.dispatchEvent.bind( this );
        const onSuccess = () => {

            /**
             * Play event
             * @type {object}
             * @event VideoPanorama#play
             *
             */
            dispatchEvent( { type: 'play' } );

        };
        const onError = ( error ) => {

            // Error playing video. Retry next frame. Possibly Waiting for user interaction
            window.requestAnimationFrame( playVideo );

            /**
             * Play event
             * @type {object}
             * @event VideoPanorama#play-error
             *
             */
            dispatchEvent( { type: 'play-error', error } );

        };

        if ( video && video.paused ) {

            video.play().then( onSuccess ).catch( onError );

        }

    },

    /**
     * Pause video
     * @memberOf VideoPanorama
     * @instance
     * @fires VideoPanorama#pause
     */
    pauseVideo: function () {

        const video = this.videoElement;

        if ( video && !video.paused ) {

            video.pause();

        }

        /**
         * Pause event
         * @type {object}
         * @event VideoPanorama#pause
         *
         */
        this.dispatchEvent( { type: 'pause' } );

    },

    /**
     * Resume video
     * @memberOf VideoPanorama
     * @instance
     */
    resumeVideoProgress: function () {

        const video = this.videoElement;

        if ( video.readyState >= 4 && video.autoplay && !this.isMobile() ) {

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

    },

    /**
     * Reset video at stating point
     * @memberOf VideoPanorama
     * @instance
     */
    resetVideo: function () {

        const video = this.videoElement;

        if ( video ) {

            this.setVideoCurrentTime( { percentage: 0 } );

        }

    },

    /**
     * Check if video is muted
     * @memberOf VideoPanorama
     * @instance
     * @return {boolean} - is video muted or not
     */
    isVideoMuted: function () {

        return this.videoElement.muted;

    },

    /**
     * Mute video
     * @memberOf VideoPanorama
     * @instance
     */
    muteVideo: function () {

        const video = this.videoElement;

        if ( video && !video.muted ) {

            video.muted = true;

        }

        this.dispatchEvent( { type: 'volumechange' } );

    },

    /**
     * Unmute video
     * @memberOf VideoPanorama
     * @instance
     */
    unmuteVideo: function () {

        const video = this.videoElement;

        if ( video && this.isVideoMuted() ) {

            video.muted = false;

        }

        this.dispatchEvent( { type: 'volumechange' } );

    },

    /**
     * Returns the video element
     * @memberOf VideoPanorama
     * @instance
     * @returns {HTMLElement}
     */
    getVideoElement: function () {

        return this.videoElement;

    },

    /**
     * Dispose video panorama
     * @memberOf VideoPanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        this.pauseVideo();
		
        this.removeEventListener( 'leave', this.pauseVideo.bind( this ) );
        this.removeEventListener( 'enter-fade-start', this.resumeVideoProgress.bind( this ) );
        this.removeEventListener( 'video-toggle', this.toggleVideo.bind( this ) );
        this.removeEventListener( 'video-time', this.setVideoCurrentTime.bind( this ) );

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

export { VideoPanorama };