import { ImagePanorama } from './ImagePanorama';
import { GoogleStreetviewLoader } from '../loaders/GoogleStreetviewLoader';
import * as THREE from 'three';

/**
 * @classdesc Google streetview panorama
 * @description [How to get Panorama ID]{@link http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id}
 * @constructor
 * @param {string} panoId - Panorama id from Google Streetview 
 * @param {string} [apiKey] - Google Street View API Key
 */
class GoogleStreetviewPanorama extends ImagePanorama {
    
    constructor( panoId, apiKey ) {
        super();
        this.panoId = panoId;

        this.gsvLoader = null;
  
        this.loadRequested = false;
  
        this.setupGoogleMapAPI( apiKey );
    }

    /**
     * Load Google Street View by panorama id
     * @param {string} panoId - Gogogle Street View panorama id
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    load ( panoId ) {

        this.loadRequested = true;
  
        panoId = ( panoId || this.panoId ) || {};
  
        if ( panoId && this.gsvLoader ) {
  
            this.loadGSVLoader( panoId );
  
        }
  
    }
  
    /**
     * Setup Google Map API
     * @param {string}  apiKey
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    setupGoogleMapAPI ( apiKey ) {
  
        const script = document.createElement( 'script' );
        script.src = 'https://maps.googleapis.com/maps/api/js?';
        script.src += apiKey ? 'key=' + apiKey : '';
        script.onreadystatechange = this.setGSVLoader.bind( this );
        script.onload = this.setGSVLoader.bind( this );
  
        document.querySelector( 'head' ).appendChild( script );
  
    }
  
    /**
     * Set GSV Loader
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    setGSVLoader () {
  
        this.gsvLoader = new GoogleStreetviewLoader();
  
        if ( this.loadRequested ) {
  
            this.load();
  
        }
  
    }
  
    /**
     * Get GSV Loader
     * @memberOf GoogleStreetviewPanorama
     * @instance
     * @return {GoogleStreetviewLoader} GSV Loader instance
     */
    getGSVLoader () {
  
        return this.gsvLoader;
  
    }
  
    /**
     * Load GSV Loader
     * @param  {string} panoId - Gogogle Street View panorama id
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    loadGSVLoader ( panoId ) {
  
        this.loadRequested = false;
  
        this.gsvLoader.onProgress = this.onProgress.bind( this );
  
        this.gsvLoader.onPanoramaLoad = this.onLoad.bind( this );
  
        this.gsvLoader.setZoom( this.getZoomLevel() );
  
        this.gsvLoader.load( panoId );
  
        this.gsvLoader.loaded = true;
    }
  
    /**
     * This will be called when panorama is loaded
     * @param  {HTMLCanvasElement} canvas - Canvas where the tiles have been drawn
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    onLoad ( canvas ) {
  
        ImagePanorama.prototype.onLoad.call( this, new THREE.Texture( canvas ) );
  
    }
  
    /**
     * Reset
     * @memberOf GoogleStreetviewPanorama
     * @instance
     */
    reset () {
  
        this.gsvLoader = undefined;
  
        ImagePanorama.prototype.reset.call( this );
  
    }
}

export { GoogleStreetviewPanorama };