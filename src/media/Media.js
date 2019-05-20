(function(){

    PANOLENS.Media = function ( options = {} ) {

        this.container = options.container;
        this.scene = options.scene;
        this.constraints = options.constraints || { video: {}, audio: false, facingMode: 'environment' };

        this.element;
        this.streams = {};
        this.streamId;

    };

    Object.assign( PANOLENS.Media.prototype, {

        start: async function() {

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
            this.container.appendChild( this.element );

            try {
                
                const stream = await navigator.mediaDevices.getUserMedia( this.constraints );
                this.attachVideoSourceObject( stream );

                window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
                
            } catch( err ) {

                console.error( err );

            }

        },

        stop: function () {

            const stream = this.streams[ this.streamId ];

            if ( stream && stream.active ) {

                const track = stream.getTracks()[ 0 ];

                track.stop();

                window.removeEventListener( 'resize', this.onWindowResize.bind( this ) );
                
                this.element.parentElement.removeChild( this.element );

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
            this.scene.background = this.createVideoTexture();

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
            video.style.display = 'none';

            return video;

        },

        onWindowResize: function ( event ) {

            if ( this.element && this.element.videoWidth && this.element.videoHeight ) {

                const container = this.container;
                const texture = this.scene.background;
                const { videoWidth, videoHeight } = this.element;
                const cameraRatio = videoHeight / videoWidth;
                const viewportRatio = container.clientWidth / container.clientHeight;
                texture.repeat.set( cameraRatio * viewportRatio, 1 );

            }

        }

    } );


})();