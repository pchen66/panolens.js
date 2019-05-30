import 'three';

/**
 * User Media
 * @param {object} [constraints={ video: {}, audio: false, facingMode: 'environment' }]
 */
function Media ( constraints = { video: {}, audio: false, facingMode: 'environment' } ) {

    this.constraints = constraints;

    this.container
    this.scene;
    this.element;
    this.streams = {};
    this.streamId;

};

Object.assign( Media.prototype, {

    start: function() {

        const optional = [
            { minWidth: 320  },
            { minWidth: 640  },
            { minWidth: 1024 },
            { minWidth: 1280 },
            { minWidth: 1920 }
        ];

        const { video } = this.constraints;

        if ( !video.optional ) {

            video.optional = optional;

        }

        this.element = this.createVideoElement();

        return navigator.mediaDevices.getUserMedia( this.constraints )
        .catch( error => { console.warn( `PANOLENS.Media: ${error}` ) } );

    },

    stop: function () {

        const stream = this.streams[ this.streamId ];

        if ( stream && stream.active ) {

            const track = stream.getTracks()[ 0 ];

            track.stop();

            window.removeEventListener( 'resize', this.onWindowResize.bind( this ) );

            this.element = null;
            this.streamId = null;
            this.streams = {};

        }

    },

    attachVideoSourceObject: function ( stream ) {

        this.streams[ stream.id ] = stream;
        
        if ( this.streamId ) { return; }
        
        this.streamId = stream.id;
        this.element.srcObject = stream;

        if ( this.scene ) {

            this.scene.background = this.createVideoTexture();

        }
        
        window.addEventListener( 'resize', this.onWindowResize.bind( this ) );

    },

    createVideoTexture: function () {

        const video = this.element;
        const texture = new THREE.VideoTexture( video );

        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.center.set( 0.5, 0.5 );

        video.addEventListener( 'canplay', this.onWindowResize.bind( this ) );

        return texture;

    },

    createVideoElement: function() {

        const video = document.createElement( 'video' );
        
        video.setAttribute( 'autoplay', '' );
        video.setAttribute( 'muted', '' );
        video.setAttribute( 'playsinline', '' );

        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectPosition = 'center';
        video.style.objectFit = 'cover';
        video.style.display = this.scene ? 'none' : '';

        return video;

    },

    onWindowResize: function ( event ) {

        if ( this.element && this.element.videoWidth && this.element.videoHeight && this.scene ) {

            const container = this.container;
            const texture = this.scene.background;
            const { videoWidth, videoHeight } = this.element;
            const cameraRatio = videoHeight / videoWidth;
            const viewportRatio = container ? container.clientWidth / container.clientHeight : 1.0;
            texture.repeat.set( -cameraRatio * viewportRatio, 1 );

        }

    }

} );

export { Media };