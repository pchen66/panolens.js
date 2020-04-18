import { Panorama } from './Panorama';
import { PanoMoments } from '../loaders/PanoMoments';
import * as THREE from 'three';

/**
 * @classdesc PanoMomentPanorama based panorama
 * @constructor
 * @param {object, bool} PanoMoments identifier and force reload option
 */

function PanoMomentPanorama ( identifier, forceReload ) {

    Panorama.call( this );

    this.identifier = identifier;
    this.PanoMomentss = null;
    this.momentData = null;
    this.camera = null;

    this.reload = false;
    this.forceReload = forceReload !== undefined ? forceReload : false; // Some use-cases won't require that the PanoMoment is disposed/re-loaded on enter/leave
    this.isReady = false;

    this.addEventListener( 'panolens-camera', this.onPanolensCamera.bind( this ) );

}

PanoMomentPanorama.prototype = Object.assign( Object.create( Panorama.prototype ), {

    constructor: PanoMomentPanorama,

    /**
     * When camera reference dispatched
     * @param {THREE.Camera} camera 
     */
    onPanolensCamera: function( { camera } ) {
        this.camera = camera;
    },

    load: function () {
        this.PanoMoments = new PanoMoments(this.identifier, this.renderCallback.bind( this ), this.readyCallback.bind( this ), this.loadedCallback.bind( this ));
        this.dispatchEvent( { type: 'panoMomentLoad' } );
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' });
        console.log("PanoMoment Initialized.");
        Panorama.prototype.load.call( this );
    },

    /**
     * On Panolens update callback
     */
    updateCallback: function() {
        const { camera, momentData } = this;

        if(!momentData || !this.isReady) return;
        
        const rotation = THREE.Math.radToDeg(camera.rotation.y) + 180;
        const yaw = (rotation * (momentData.clockwise ? -1.0 : 1.0) + 90) % 360;

        this.setPanoMomentYaw( yaw );
    },

    renderCallback: function (video, momentData) {
        
        if (!this.momentData) {

            this.momentData = momentData;

            const texture = new THREE.VideoTexture( video );
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.format = THREE.RGBFormat;         
            this.updateTexture( texture );

            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'resetAzimuthAngleLimits' } );
            this.camera.position.copy( this.position );// Need to reset on first render to handle start frame.
            this.camera.position.z += 1; 

            const angle = (this.momentData.start_frame + 180) / 180 * Math.PI;
            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'rotateControlLeft', data: angle } );

            this.material.uniforms.offset.value.x = (this.momentData.max_horizontal_fov / 360 + .25) % 1;

            this.dispatchEvent( { type: 'panoMomentFirstFrameDecoded' } );
            console.log('PanoMoments First Frame Decoded.');
        }
        
    },

    readyCallback: function (video, momentData) {
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl' }); // This won't work with cached PanoMoments as the callback doesn't happen. Using isReady for now.
        this.dispatchEvent( { type: 'panoMomentReady' } );
        this.isReady = true;
        console.log('PanoMoment Ready.');
    },

    loadedCallback: function (video, momentData) {
        console.log("PanoMoment Download Complete.");
    },

    /**
     * Set PanoMoment yaw
     * @memberOf PanoMomentPanorama
     * @instance
     * @param {object} event - Event contains float. 0.0 to 360.0
     */

    setPanoMomentYaw: function (yaw) {

        if(!this.PanoMoments) return;

        const { momentData, PanoMoments: { render, FrameCount, textureReady } } = this;

        if(!momentData) return;

        render((yaw / 360) * FrameCount);

        if (textureReady) {
            this.getTexture().needsUpdate = true;
        }

    },

     /**
     * onEnter
     * @memberOf PanoMomentPanorama
     * @instance
     */
    onEnter: function () {

        // Add update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'addUpdateCallback', 
            data: this.updateCallback.bind(this)
        });

        if (this.reload && this.forceReload) {
            this.reload = false;
            this.load();
        }

        Panorama.prototype.onEnter.call( this );

    },

    /**
     * onLeave
     * @memberOf PanoMomentPanorama
     * @instance
     */
    onLeave: function () {

        // Remove update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'removeUpdateCallback', 
            data: this.updateCallback.bind(this)
        });

        if (this.forceReload) {
            this.isReady = false;
            this.reload = true;
            this.PanoMoments.dispose(); // This currently doesn't stop an ongoing download which is a bit of an issue... Maybe for later though.
            this.PanoMoments = null; 
            this.momentData = null;
            this.updateTexture(null); // Get rid of the stale frame
        }

        Panorama.prototype.onLeave.call( this );

    },

    /**
     * Reset
     * @memberOf PanoMomentPanorama
     * @instance
     */
    reset: function () {

        Panorama.prototype.reset.call( this );

    },

    /**
     * Dispose
     * @memberOf PanoMomentPanorama
     * @instance
     */
    dispose: function () {

        const { material: { map } } = this;

        if ( map ) { map.dispose(); }

        Panorama.prototype.dispose.call( this );

    }

} );

export { PanoMomentPanorama };