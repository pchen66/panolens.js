
import { TextureLoader } from './TextureLoader';

/**
 * @classdesc Google Street View Loader
 * @constructor
 * @param {object} parameters 
 */
function GoogleStreetviewLoader ( parameters = {} ) {

    this._parameters = parameters;
    this._zoom = null;
    this._panoId = null;
    this._panoClient = new google.maps.StreetViewService();
    this._count = 0;
    this._total = 0;
    this._canvas = [];
    this._ctx = [];
    this._wc = 0;
    this._hc = 0;
    this.result = null;
    this.rotation = 0;
    this.copyright = '';
    this.onSizeChange = null;
    this.onPanoramaLoad = null;

    this.levelsW = [ 1, 2, 4, 7, 13, 26 ];
    this.levelsH = [ 1, 1, 2, 4, 7, 13 ];

    this.widths = [ 416, 832, 1664, 3328, 6656, 13312 ];
    this.heights = [ 416, 416, 832, 1664, 3328, 6656 ];

    let gl;

    try {

        const canvas = document.createElement( 'canvas' );

        gl = canvas.getContext( 'experimental-webgl' );

        if( !gl ) {

            gl = canvas.getContext( 'webgl' );

        }

    }
    catch ( error ) {

    }

    const maxTexSize = Math.max( gl.getParameter( gl.MAX_TEXTURE_SIZE ), 6656 );
    this.maxW = maxTexSize;
    this.maxH = maxTexSize;

}

Object.assign( GoogleStreetviewLoader.prototype, {

    constructor: GoogleStreetviewLoader,

    /**
     * Set progress
     * @param {number} loaded 
     * @param {number} total 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    setProgress: function ( loaded, total ) {

        if ( this.onProgress ) {

            this.onProgress( { loaded: loaded, total: total } );

        }
		
    },

    /**
     * Throw error
     * @param {string} message 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    throwError: function ( message ) {

        if ( this.onError ) {

            this.onError( message );
			
        } else {

            console.error( message );

        }
		
    },

    /**
     * Adapt texture to zoom
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    adaptTextureToZoom: function () {

        const w = this.widths [ this._zoom ];
        const h = this.heights[ this._zoom ];

        const maxW = this.maxW;
        const maxH = this.maxH;

        this._wc = Math.ceil( w / maxW );
        this._hc = Math.ceil( h / maxH );

        for( let y = 0; y < this._hc; y++ ) {
            for( let x = 0; x < this._wc; x++ ) {
                const c = document.createElement( 'canvas' );
                if( x < ( this._wc - 1 ) ) c.width = maxW; else c.width = w - ( maxW * x );
                if( y < ( this._hc - 1 ) ) c.height = maxH; else c.height = h - ( maxH * y );
                this._canvas.push( c );
                this._ctx.push( c.getContext( '2d' ) );
            }
        }

    },

    /**
     * Compose from tile
     * @param {number} x 
     * @param {number} y 
     * @param {*} texture 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    composeFromTile: function ( x, y, texture ) {

        const maxW = this.maxW;
        const maxH = this.maxH;

        x *= 512;
        y *= 512;

        const px = Math.floor( x / maxW );
        const py = Math.floor( y / maxH );

        x -= px * maxW;
        y -= py * maxH;

        this._ctx[ py * this._wc + px ].drawImage( texture, 0, 0, texture.width, texture.height, x, y, 512, 512 );

        this.progress();
		
    },

    /**
     * Progress
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    progress: function() {

        this._count++;
		
        this.setProgress( this._count, this._total );
		
        if ( this._count === this._total) {

            this.canvas = this._canvas;
            this.panoId = this._panoId;
            this.zoom = this._zoom;

            if ( this.onPanoramaLoad ) {

                this.onPanoramaLoad( this._canvas[ 0 ] );

            }

        }
    },

    /**
     * Load google street view by id
     * @param {string} id 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    loadFromId: function( id ) {

        this._panoId = id;
        this.composePanorama();

    },

    /**
     * Compose panorama
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    composePanorama: function () {

        this.setProgress( 0, 1 );
		
        const w = this.levelsW[ this._zoom ];
        const h = this.levelsH[ this._zoom ];
        const self = this;
			
        this._count = 0;
        this._total = w * h;

        const { useWebGL } = this._parameters;

        for( let y = 0; y < h; y++ ) {
            for( let x = 0; x < w; x++ ) {
                const url = 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&zoom=' + this._zoom + '&x=' + x + '&y=' + y + '&panoid=' + this._panoId + '&nbt&fover=2';
                ( function( x, y ) { 
                    if( useWebGL ) {
                        const texture = TextureLoader.load( url, null, function() {
                            self.composeFromTile( x, y, texture );
                        } );
                    } else {
                        const img = new Image();
                        img.addEventListener( 'load', function() {
                            self.composeFromTile( x, y, this );			
                        } );
                        img.crossOrigin = '';
                        img.src = url;
                    }
                } )( x, y );
            }
        }
		
    },

    /**
     * Load
     * @param {string} panoid 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    load: function ( panoid ) {

        this.loadPano( panoid );

    },

    /**
     * Load panorama
     * @param {string} id
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    loadPano: function( id ) {

        const self = this;
        this._panoClient.getPanoramaById( id, function (result, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                self.result = result;
                if( self.onPanoramaData ) self.onPanoramaData( result );
                /*
                 * var h = google.maps.geometry.spherical.computeHeading(location, result.location.latLng);
                 * rotation = (result.tiles.centerHeading - h) * Math.PI / 180.0;
                 */
                self.copyright = result.copyright;
                self._panoId = result.location.pano;
                self.location = location;
                self.composePanorama();
            } else {
                if( self.onNoPanoramaData ) self.onNoPanoramaData( status );
                self.throwError('Could not retrieve panorama for the following reason: ' + status);
            }
        });
		
    },

    /**
     * Set zoom level
     * @param {number} z 
     * @memberOf GoogleStreetviewLoader
     * @instance
     */
    setZoom: function( z ) {
        this._zoom = z;
        this.adaptTextureToZoom();
    }
	
} );

export { GoogleStreetviewLoader };