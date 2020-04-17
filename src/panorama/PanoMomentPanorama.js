import { Panorama } from './Panorama';
import { PanoMoments } from '../loaders/PanoMoments';
import * as THREE from 'three';

/**
 * PanoMoments Panorama
 * @param {object} identifier PanoMoment identifier
 * @param {object} offset texture uv offset
 */
function PanoMomentPanorama ( identifier, offset = { x: 0.5, y: 0.0 } ) {

    Panorama.call( this );

    this.identifier = identifier;
    this.PanoMoments = null;
    this.momentData = null;
    this.camera = null;

    this.viwerUpdateCallback = this.updateCallback.bind(this);

    // Default offset for pano moments
    this.material.uniforms.offset.value.x = offset.x;
    this.material.uniforms.offset.value.y = offset.y;

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

    /**
     * Load Pano Moment Panorama
     */
    load: function () {

        this.dispatchEvent( { type: 'panoMomentLoad' } );
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'disableControl' });

        Panorama.prototype.load.call( this );

    },

    /**
     * On Panolens update callback
     */
    updateCallback: function() {

        const { camera, momentData } = this;

        if(!momentData) return;
        
        const rotation = THREE.Math.radToDeg(camera.rotation.y) + 180;
        const yaw = (rotation * (momentData.clockwise ? -1.0 : 1.0) + 90) % 360;

        this.setPanoMomentYaw( yaw );
        
    },

    /**
     * On Pano Moment Render Callback
     */
    renderCallback: function (video, momentData) {

        if (!this.momentData) {

            this.momentData = momentData;

            const texture = new THREE.VideoTexture( video );
            texture.minFilter = texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.format = THREE.RGBFormat;         
            this.updateTexture( texture );

            const angle = (momentData.start_frame + 180) / 180 * Math.PI;
            this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'rotateControlLeft', data: angle } );

            console.log('PanoMoments First Frame Decoded');
        }
    },

    /**
     * On Pano Moment Ready Callback
     */
    readyCallback: function () {
        this.dispatchEvent( { type: 'panolens-viewer-handler', method: 'enableControl' });
        this.dispatchEvent( { type: 'panoMomentReady' } );
        console.log('PanoMoment Ready');
    },

    /**
     * On Pano Moment Loaded Callback
     */
    loadedCallback: function () {
        console.log('PanoMoment Download Completed');
    },

    /**
     * Set PanoMoment yaw
     * @memberOf PanoMomentPanorama
     * @param {number} yaw - yaw value from 0 to 360 in degree
     */
    setPanoMomentYaw: function (yaw) {

        const { momentData, PanoMoments: { render, FrameCount, textureReady } } = this;

        if(!momentData) return;

        render((yaw / 360) * FrameCount);

        if (textureReady) this.getTexture().needsUpdate = true;

    },

    /**
     * onEnter
     * @memberOf PanoMomentPanorama
     * @instance
     */
    onEnter: function () {

        const { identifier, renderCallback, readyCallback, loadedCallback } = this;

        this.PanoMoments = new PanoMoments(
            identifier, 
            renderCallback.bind( this ), 
            readyCallback.bind( this ), 
            loadedCallback.bind( this )
        );

        // Add update callback
        this.dispatchEvent( { 
            type: 'panolens-viewer-handler', 
            method: 'addUpdateCallback', 
            data: this.viwerUpdateCallback
        });

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
            data: this.viwerUpdateCallback
        });

        this.PanoMoments.dispose();
        this.PanoMoments = null;;

        Panorama.prototype.onLeave.call( this );

    }

} );

export { PanoMomentPanorama };